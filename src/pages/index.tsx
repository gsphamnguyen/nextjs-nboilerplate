import Container from '@mui/material/Container';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const handleFileChange = ($event: ChangeEvent<HTMLInputElement>) => {
    const fileInput = $event.target;
    if (!fileInput.files) {
      alert('No file was chosen');
    }
    if (!fileInput.files || fileInput.files.length === 0) {
      alert('Files list is empty');
      return;
    }

    const file = fileInput.files[0];

    /** File validation */
    if (!file.type.startsWith('image')) {
      alert('Please select a valide image');
      return;
    }

    /** Setting file state */
    setFile(file); // we will use the file state, to send it later to the server
    setPreviewUrl(URL.createObjectURL(file)); // we will use this to show the preview of the image

    /** Reset file input */
    $event.currentTarget.type = 'text';
    $event.currentTarget.type = 'file';
  };
  return (
    <Main
      meta={
        <Meta
          title="Next.js Boilerplate Presentation"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
    >
      <Container maxWidth="sm" className="!flex flex-1 flex-col items-center">
        <h1 className="semibold my-5 text-2xl">
          Convert JSON to Word report template
        </h1>
        <div className="flex w-full items-center justify-center">
          <label className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                className="mb-3 h-10 w-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              onChange={handleFileChange}
              type="file"
              className="hidden"
            />
          </label>
        </div>
      </Container>
    </Main>
  );
};

export default Index;
