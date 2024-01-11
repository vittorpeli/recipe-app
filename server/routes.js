import { Router } from "express";
import 'dotenv/config';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.API_KEY
})

const route = Router(); 

route.get("/", (req, res) => {
  res.send("Hello World")
})

route.post("/generate", async(req, res) => {
  const { prompt, functions, functionCall } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: prompt,
      functions: functions,
      function_call: functionCall,
    });
    console.log('Generated Text:', response.choices[0].message);

    const generatedText = response.choices[0].message;
    res.json({ generatedText });
  } catch (error) {
    console.error('Error calling OpenAI API:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

export default route;

//   const response = openai.createChatCompletion({
//     model: "gpt-4",
//     messages,
//   })
//   response
//     .then((result) => {
//       messages.push({
//         role: "assistant",
//         content: result.data.choices[0].message.content,
//       });
//       res.send(result.data.choices[0].message.content);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
// })