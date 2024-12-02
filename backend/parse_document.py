import sys
import io
from PyPDF2 import PdfReader
from docx import Document

# Force UTF-8 encoding for script output - otherwise encoding error
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def parse_document(file_path):
    try:
        if file_path.endswith(".pdf"):
            reader = PdfReader(file_path)
            text = "\n".join([page.extract_text() for page in reader.pages if page.extract_text()])
        elif file_path.endswith(".docx"):
            doc = Document(file_path)
            text = "\n".join([paragraph.text for paragraph in doc.paragraphs])
        else:
            # Handle TXT or other plain text files with encoding fallback
            try:
                with open(file_path, "r", encoding="utf-8") as file:
                    text = file.read()
            except UnicodeDecodeError:
                with open(file_path, "r", encoding="latin1") as file:
                    text = file.read()
        return text
    except Exception as e:
        return f"Error parsing document: {str(e)}"

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("No file path provided")
        sys.exit(1)
    file_path = sys.argv[1]
    print(parse_document(file_path))
