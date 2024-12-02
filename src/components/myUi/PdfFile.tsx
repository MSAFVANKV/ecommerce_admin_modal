import { cn } from "@/lib/utils";
import { useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/cjs/Page/AnnotationLayer.css";
import "react-pdf/dist/cjs/Page/TextLayer.css";

interface PdfFileProps {
  fileURL: string;
  className?: string;
}

export default function PdfFile({ fileURL, className }: PdfFileProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  // Load success callback with proper typing
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  // Load error callback with Error type
  function onDocumentLoadError(error: Error) {
    console.error("Failed to load PDF:", error);
    setError("Failed to load PDF file.");
  }

  return (
    <div
      className={cn(
        `w-16 h-24 overflow-hidden border border-gray-300 rounded-lg flex items-center justify-center`,
        className
      )}
    >
      {error && <p className="text-red-600">{error}</p>}
      <Document
        file={fileURL}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
      >
        {/* Map through the number of pages to render each page */}
        {Array.from(new Array(numPages), (_, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            width={64} // Width in pixels (16 * 4)
            height={96} // Height in pixels (24 * 4)
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        ))}
      </Document>
    </div>
  );
}
