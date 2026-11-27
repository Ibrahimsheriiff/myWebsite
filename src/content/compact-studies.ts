// Public editorial copy only. Internal source revisions/provenance stay in docs/.
export const mediqueryStudy = {
  title: 'MediQuery — An answer is only as good as its evidence.',
  description:
    'An independent React and FastAPI biomedical research application: PubMed ingestion, BioBERT embeddings, MMR retrieval and source-cited generation.',
  repository: 'https://github.com/Ibrahimsheriiff/mediquery',
  pipeline: [
    {
      name: 'Collect',
      detail:
        'PubMed search and abstract records through Entrez. Articles without an abstract are skipped.',
    },
    {
      name: 'Prepare',
      detail:
        'Title + abstract split into character chunks: 512 characters, with 64-character overlap. Source metadata stays attached.',
    },
    {
      name: 'Embed & store',
      detail:
        'dmis-lab/biobert-base-cased-v1.2 through HuggingFaceEmbeddings, CPU and normalised embeddings, stored in ChromaDB.',
    },
    {
      name: 'Retrieve & answer',
      detail:
        'MMR requests up to five chunks, considering up to fifteen candidates. A LangChain chain supplies labelled context to Llama-3.1-8B-Instruct via Hugging Face.',
    },
  ],
};
export const returnsStudy = {
  title: 'Returns Agent — Let AI understand. Let rules decide.',
  description:
    'A LangGraph returns prototype separating language interpretation, trusted order lookup, deterministic policy, structured replies and validation.',
  repository: 'https://github.com/Ibrahimsheriiff/autonomous-returns-agent',
};
