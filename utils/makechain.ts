import { OpenAI } from 'langchain/llms/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { ConversationalRetrievalQAChain } from 'langchain/chains';

const CONDENSE_PROMPT = `Dada la siguiente conversación y una pregunta de seguimiento, reformule la pregunta de seguimiento para que sea una pregunta independiente.

Historial de conversaciones:
{chat_history}
Entrada de seguimiento: {question}
Preguntas independientes:`;

const QA_PROMPT = `Eres un útil asistente de IA. Use las siguientes piezas de contexto para responder la pregunta al final.
Si no sabe la respuesta, simplemente diga que no la sabe. NO trate de inventar una respuesta.
Si la pregunta no está relacionada con el contexto, responda cortésmente que está sintonizado para responder solo preguntas relacionadas con el contexto.

{context}

Pregunta: {question}
Respuesta útil en Markdown:`;

export const makeChain = (vectorstore: PineconeStore) => {
  const model = new OpenAI({
    temperature: 0, // increase temepreature to get more creative answers
    modelName: 'gpt-3.5-turbo', //change this to gpt-4 if you have access
  });

  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorstore.asRetriever(),
    {
      qaTemplate: QA_PROMPT,
      questionGeneratorTemplate: CONDENSE_PROMPT,
      returnSourceDocuments: true, //The number of source documents returned is 4 by default
    },
  );
  return chain;
};
