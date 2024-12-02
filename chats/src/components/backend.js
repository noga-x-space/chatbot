// import axios from 'axios';

// const apiKey = process.env.OPENAI_API_KEY;  // Load the API key from environment variables

// const sendMessageToOpenAI = async (messages) => {
//   try {
//     const response = await axios.post(
//       'https://api.openai.com/v1/completions',
//       {
//         model: 'gpt-4',
//         prompt: messages.map((msg) => `${msg.role}: ${msg.content}`).join('\n'),
//         temperature: 0.5,
//         max_tokens: 150,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${apiKey}`,
//         },
//       }
//     );

//     return response.data.choices[0].text.trim();
//   } catch (error) {
//     console.error('Error sending message to OpenAI:', error);
//     return 'Sorry, I couldn\'t process that request.';
//   }
// };
