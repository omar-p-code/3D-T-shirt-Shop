import express from "express";
import * as dotenv from "dotenv";
import { HfInference } from "@huggingface/inference";

dotenv.config();
const router = express.Router();

// استخدم FLUX.1-schnell → أسرع وأحسن ومجاني
const hf = new HfInference(process.env.HF_API_KEY);

router.post("/", async (req, res) => {
   const { prompt } = req.body || {};

   if (!prompt || prompt.trim() === "") {
      return res.status(400).json({ error: "برجاء إرسال prompt" });
   }

   try {
      // الموديل الجديد والمجاني والسريع جداً
      const imageBlob = await hf.textToImage({
         model: "black-forest-labs/FLUX.1-schnell",  // ده الموديل السحري
         inputs: prompt,
         parameters: {
            num_inference_steps: 4,   // سرعة رهيبة بسبب schnelle
            guidance_scale: 0,        // مش محتاج مع FLUX.1-schnell
         },
      });

      // تحويل Blob → Base64
      const arrayBuffer = await imageBlob.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64Image = buffer.toString("base64");

      res.json({
         photo: `data:image/png;base64,${base64Image}`,
         model: "FLUX.1-schnell",
         note: "مجاني تماماً وسريع جداً!"
      });

   } catch (error) {
      console.error("خطأ في توليد الصورة:", error.message);

      // بعض الأخطاء الشائعة وتوضيحها
      if (error.message.includes("rate limit")) {
         return res.status(429).json({ error: "تم تجاوز الحد المجاني مؤقتاً، جرب بعد دقيقة" });
      }

      res.status(500).json({
         error: "فشل في توليد الصورة",
         details: error.message
      });
   }
});

export default router;