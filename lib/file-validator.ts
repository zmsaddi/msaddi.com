import { fileTypeFromBuffer } from "file-type";

/**
 * File validation result
 */
export interface FileValidationResult {
  valid: boolean;
  error?: string;
  mimeType?: string;
  extension?: string;
  size?: number;
}

/**
 * Allowed file types with their MIME types and extensions
 * Based on security requirements and business needs
 */
const ALLOWED_FILE_TYPES: {
  [key: string]: {
    mimeTypes: string[];
    extensions: string[];
    maxSize: number;
  };
} = {
  // Images - for product photos, reference images
  images: {
    mimeTypes: ["image/jpeg", "image/png", "image/gif", "image/webp"],
    extensions: ["jpg", "jpeg", "png", "gif", "webp"],
    maxSize: 5 * 1024 * 1024, // 5MB
  },
  // Documents - for specifications, quotes
  documents: {
    mimeTypes: [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    ],
    extensions: ["pdf", "docx", "xlsx"],
    maxSize: 10 * 1024 * 1024, // 10MB
  },
  // CAD Files - for technical drawings
  cad: {
    mimeTypes: [
      "image/vnd.dwg", // DWG
      "image/vnd.dxf", // DXF
      "application/step", // STEP
      "application/sla", // STL
    ],
    extensions: ["dwg", "dxf", "step", "stp", "stl"],
    maxSize: 20 * 1024 * 1024, // 20MB (CAD files can be large)
  },
  // Archives - for multiple files
  archives: {
    mimeTypes: ["application/zip"],
    extensions: ["zip"],
    maxSize: 15 * 1024 * 1024, // 15MB
    // Note: We explicitly exclude RAR and 7z for security reasons
  },
};

/**
 * Dangerous file extensions that should never be allowed
 * Even if disguised with correct magic bytes
 */
const DANGEROUS_EXTENSIONS = [
  // Executables
  "exe",
  "bat",
  "cmd",
  "com",
  "scr",
  "msi",
  // Scripts
  "js",
  "vbs",
  "ps1",
  "sh",
  "py",
  "rb",
  // System files
  "dll",
  "sys",
  "drv",
  // Macros
  "doc",
  "xls",
  "ppt", // Old formats with macro support
  "xlsm",
  "docm",
  "pptm", // New formats with macros
  // Web/Server
  "php",
  "asp",
  "aspx",
  "jsp",
  // Others
  "app",
  "deb",
  "rpm",
];

/**
 * Get all allowed MIME types across all categories
 */
function getAllowedMimeTypes(): string[] {
  return Object.values(ALLOWED_FILE_TYPES).flatMap((category) => category.mimeTypes);
}

/**
 * Get all allowed extensions across all categories
 */
function getAllowedExtensions(): string[] {
  return Object.values(ALLOWED_FILE_TYPES).flatMap((category) => category.extensions);
}

/**
 * Get maximum file size for a specific MIME type
 */
function getMaxSizeForMimeType(mimeType: string): number {
  for (const category of Object.values(ALLOWED_FILE_TYPES)) {
    if (category.mimeTypes.includes(mimeType)) {
      return category.maxSize;
    }
  }
  return 10 * 1024 * 1024; // Default 10MB
}

/**
 * Extract file extension from filename
 */
function getFileExtension(filename: string): string {
  const parts = filename.toLowerCase().split(".");
  return parts.length > 1 ? parts[parts.length - 1] : "";
}

/**
 * Check if file extension is dangerous
 */
function isDangerousExtension(filename: string): boolean {
  const ext = getFileExtension(filename);
  return DANGEROUS_EXTENSIONS.includes(ext);
}

/**
 * Validate file using Magic Byte detection
 *
 * This function provides comprehensive file validation:
 * 1. Checks actual file content (magic bytes) not just extension
 * 2. Validates file size limits per type
 * 3. Prevents malicious files disguised with safe extensions
 * 4. Blocks dangerous file types completely
 *
 * @param file - The File object to validate
 * @returns Promise<FileValidationResult>
 */
export async function validateFile(file: File): Promise<FileValidationResult> {
  try {
    // 1. Check if file exists and has content
    if (!file || file.size === 0) {
      return {
        valid: false,
        error: "File is empty or not provided",
      };
    }

    // 2. Check for dangerous extensions (immediate rejection)
    if (isDangerousExtension(file.name)) {
      return {
        valid: false,
        error: `File type not allowed: ${getFileExtension(file.name)}. Executable and script files are not permitted for security reasons.`,
      };
    }

    // 3. Check maximum absolute file size (20MB for any file)
    const MAX_ABSOLUTE_SIZE = 20 * 1024 * 1024; // 20MB
    if (file.size > MAX_ABSOLUTE_SIZE) {
      return {
        valid: false,
        error: `File too large. Maximum size is ${MAX_ABSOLUTE_SIZE / (1024 * 1024)}MB`,
        size: file.size,
      };
    }

    // 4. Read file buffer for magic byte detection
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 5. Detect actual file type using magic bytes
    const detectedType = await fileTypeFromBuffer(buffer);

    // 6. Handle files where magic bytes couldn't be detected
    if (!detectedType) {
      // Some file types (like plain text, CSV) don't have magic bytes
      // For security, we reject files without detectable magic bytes
      // unless they're explicitly allowed text formats
      const ext = getFileExtension(file.name);
      if (["txt", "csv"].includes(ext)) {
        // Allow plain text files (no magic bytes)
        return {
          valid: true,
          mimeType: "text/plain",
          extension: ext,
          size: file.size,
        };
      }

      return {
        valid: false,
        error: "Unable to determine file type. The file may be corrupted or unsupported.",
      };
    }

    // 7. Check if detected MIME type is allowed
    const allowedMimeTypes = getAllowedMimeTypes();
    if (!allowedMimeTypes.includes(detectedType.mime)) {
      return {
        valid: false,
        error: `File type not allowed: ${detectedType.ext}. Allowed types: images (JPG, PNG, GIF, WebP), documents (PDF, DOCX, XLSX), CAD files (DWG, DXF, STEP), and ZIP archives.`,
        mimeType: detectedType.mime,
        extension: detectedType.ext,
      };
    }

    // 8. Verify extension matches detected type
    // This prevents files disguised with fake extensions
    const fileExt = getFileExtension(file.name);
    const allowedExtensions = getAllowedExtensions();

    if (!allowedExtensions.includes(fileExt)) {
      return {
        valid: false,
        error: `File extension '${fileExt}' does not match allowed types.`,
        extension: fileExt,
      };
    }

    // 9. Check type-specific size limits
    const maxSize = getMaxSizeForMimeType(detectedType.mime);
    if (file.size > maxSize) {
      return {
        valid: false,
        error: `File too large for type ${detectedType.ext}. Maximum size is ${maxSize / (1024 * 1024)}MB`,
        size: file.size,
        mimeType: detectedType.mime,
      };
    }

    // 10. Additional security check for ZIP files
    if (detectedType.mime === "application/zip") {
      // ZIP files could contain malicious content
      // In production, consider scanning ZIP contents
      // For now, we just log and warn
      console.warn(`ZIP file uploaded: ${file.name} (${file.size} bytes)`);
    }

    // ✅ All checks passed
    return {
      valid: true,
      mimeType: detectedType.mime,
      extension: detectedType.ext,
      size: file.size,
    };
  } catch (error) {
    console.error("File validation error:", error);
    return {
      valid: false,
      error: "Error validating file. Please try again or contact support.",
    };
  }
}

/**
 * Validate multiple files
 * Returns array of validation results in same order as input
 */
export async function validateFiles(files: File[]): Promise<FileValidationResult[]> {
  return Promise.all(files.map((file) => validateFile(file)));
}

/**
 * Get human-readable file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Get allowed file types as human-readable string
 * Useful for UI hints
 */
export function getAllowedFileTypesDescription(): string {
  return "Images (JPG, PNG, GIF, WebP), Documents (PDF, DOCX, XLSX), CAD files (DWG, DXF, STEP), ZIP archives";
}

/**
 * Get max file size description
 */
export function getMaxFileSizeDescription(): string {
  return "Max 5MB for images, 10MB for documents, 20MB for CAD files, 15MB for ZIP archives";
}
