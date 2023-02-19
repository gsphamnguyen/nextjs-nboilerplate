import IconClose from '@mui/icons-material/Close';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { filesize } from 'filesize';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  display: 'flex',
  padding: theme.spacing(1),
  alignItems: 'center',
  justifyContent: 'space-between',
  fontWeight: '600',
}));

const Index = () => {
  const [fileList, setFileList] = useState<File[]>([]);
  const [showPreview, setShowPreview] = useState<Boolean>(false);
  const acceptTypeList = ['application/json'];
  const [filePreview, setFilePreview] = useState<String>('');

  const handleFileChange = ($event: ChangeEvent<HTMLInputElement>) => {
    const fileInput = $event.target;
    if (!fileInput.files) {
      alert('No file was chosen');
    }
    if (!fileInput.files || fileInput.files.length === 0) {
      alert('Files list is empty');
      return;
    }
    const blobFileList = fileInput.files;
    /* if (!acceptTypeList.includes(blobFile.type)) {
      alert('Please select a valid extension');
      return;
    } */
    // @ts-ignore
    setFileList([...fileList, ...blobFileList]);
    $event.currentTarget.type = 'text';
    $event.currentTarget.type = 'file';
  };
  const handleRemove = (index) => {
    const files = fileList;
    const result = files.filter((file, fileIndex) => fileIndex !== index);
    setFileList(result);
    if (result.length === 0) handleClearPreview();
  };
  const handlePreview = async (index) => {
    const file = fileList.find((item, fileIndex) => fileIndex === index);
    if (file) {
      const result = await readFileAsText(file);
      setFilePreview(JSON.parse(result.toString()));
      setShowPreview(true);
    }
  };
  const handleClose = () => {
    setShowPreview(false);
  };
  const handleClearPreview = () => {
    setFilePreview('');
  };
  const readFileAsText = async (file) =>
    new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = (event) => resolve(event?.target?.result);
      fileReader.onerror = (error) => reject(error);
      fileReader.readAsText(file);
    });
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
          <label className="dark:hover:bg-bray-800 flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                JSON (MAX. 10MB)
              </p>
            </div>
            <input
              id="dropzone-file"
              onChange={handleFileChange}
              type="file"
              className="hidden"
              accept={acceptTypeList.join(',')}
              multiple
            />
          </label>
        </div>
        <Stack className="my-5 w-full" spacing={2}>
          {fileList.map((file, index) => (
            <Item key={index}>
              <span className="max-w-20 truncatte text-gray-900">
                {file.name}
              </span>
              <span className="text-green-500">
                {filesize(file.size, { base: 2, standard: 'jedec' })}
              </span>
              <Chip
                label="Preview"
                size="small"
                variant="outlined"
                onClick={() => handlePreview(index)}
              />
              <IconButton
                onClick={() => handleRemove(index)}
                aria-label="delete"
                size="small"
              >
                <IconClose fontSize="inherit" />
              </IconButton>
            </Item>
          ))}
        </Stack>
        {filePreview.length > 0 && (
          <Dialog fullScreen onClose={handleClose} open={showPreview}>
            <div className="relative h-full w-full p-6">
              <IconButton
                className="!fixed right-2 top-2 z-10 print:!hidden"
                onClick={handleClose}
                aria-label="delete"
                size="small"
              >
                <IconClose fontSize="inherit" />
              </IconButton>
              <div className="gray-900 container mx-auto space-y-10">
                {filePreview.map((item, index) => (
                  <div key={index}>
                    <h1 className="solid border border-gray-200 bg-blue-200 px-2 py-1 text-lg font-semibold">
                      {item.Title}
                    </h1>
                    <div className="mt-3 ticket-content">
                      <h2 className="solid text-md border-b border-gray-900 font-semibold">
                        Priority
                      </h2>
                      <p className="mt-1 text-sm font-medium">
                        {item.Priority}
                      </p>
                    </div>
                    <div className="mt-3 ticket-content">
                      <h2 className="solid text-md border-b border-gray-900 font-semibold">
                        Description
                      </h2>
                      <div
                        className="mt-1 text-sm font-medium hideImgChild"
                        dangerouslySetInnerHTML={{ __html: item.Description }}
                      />
                    </div>
                    <div className="mt-3 ticket-content">
                      <h2 className="solid text-md border-b border-gray-900 font-semibold">
                        Acceptance Criteria
                      </h2>
                      <div
                        className="mt-1 text-sm font-medium hideImgChild"
                        dangerouslySetInnerHTML={{
                          __html: item['Acceptance Criteria'],
                        }}
                      />
                    </div>
                  </div>
                ))}
                <div className="h-screen"></div>
                <div className="h-screen"></div>
              </div>
            </div>
          </Dialog>
        )}
      </Container>
    </Main>
  );
};
export default Index;
