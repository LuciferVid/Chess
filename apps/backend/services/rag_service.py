import chromadb
from chromadb.utils import embedding_functions
import os
from typing import List, Dict

class ChessRAGService:
    def __init__(self):
        # Initialize ChromaDB client
        self.client = chromadb.PersistentClient(path="./chroma_db")
        self.embedding_fn = embedding_functions.DefaultEmbeddingFunction()
        
        # Get or create collection
        self.collection = self.client.get_or_create_collection(
            name="chess_theory",
            embedding_function=self.embedding_fn
        )

    def add_theory(self, theory_data: List[Dict]):
        """
        Add chess theory/games to the vector store.
        Each item in theory_data should have 'id', 'text', and 'metadata'.
        """
        ids = [item['id'] for item in theory_data]
        documents = [item['text'] for item in theory_data]
        metadatas = [item['metadata'] for item in theory_data]
        
        self.collection.add(
            ids=ids,
            documents=documents,
            metadatas=metadatas
        )

    def query_theory(self, fen: str, n_results: int = 3):
        """
        Query for relevant theory based on the current board state (FEN).
        """
        results = self.collection.query(
            query_texts=[fen],
            n_results=n_results
        )
        return results

rag_service = ChessRAGService()
