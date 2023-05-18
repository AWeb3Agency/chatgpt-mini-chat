import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";

const loader = new CheerioWebBaseLoader(
  "https://api.transparencia.gob.do/api/nominas?page=1&periodo=20230301&nombres=&apellidos=&institucion=&cargo=&lugar=&genero=&estatus="
);

const docs = await loader.load();