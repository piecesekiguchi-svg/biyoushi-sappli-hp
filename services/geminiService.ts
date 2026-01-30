import { GoogleGenAI, Type } from "@google/genai";
import { GeminiModel, StylePoint } from "../types";

const apiKey = process.env.API_KEY;

const ai = apiKey
  ? new GoogleGenAI({ apiKey })
  : null;


interface GeneratedStyleData {
  description: string;
  points: StylePoint[];
}

export const generateStyleSuggestion = async (
  styleName: string,
  categoryTitle: string
): Promise<GeneratedStyleData> => {
  if (!ai) {
    return {
      description: "公開版ではAI生成は無効です",
      points: []
    };
  }

  try {
    const prompt = `
      美容師向けオンラインサロンのコンテンツを作成しています。
      カテゴリ「${categoryTitle}」におけるスタイル「${styleName}」について、
      魅力的な短い説明文（description）と、技術的に注意すべきポイント（points）を3つ生成してください。
      
      Pointsは具体的で、プロの美容師が納得するような技術的なアドバイスを含めてください。
      
      JSON形式で返却してください。
    `;

    const response = await ai.models.generateContent({
      model: GeminiModel.FLASH,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            description: {
              type: Type.STRING,
              description: "スタイルの簡潔で魅力的な説明（50文字以内）",
            },
            points: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING, description: "ポイントの見出し" },
                  description: { type: Type.STRING, description: "具体的な技術的アドバイス" },
                },
                required: ["id", "title", "description"],
              },
            },
          },
          required: ["description", "points"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text) as GeneratedStyleData;

  } catch (error) {
    console.error("Gemini generation error:", error);
    // Fallback data in case of error
    return {
      description: "新しいスタイルの詳細情報。",
      points: [
        { id: "err-1", title: "詳細生成エラー", description: "AIによる生成に失敗しました。手動で編集してください。" }
      ]
    };
  }
};
