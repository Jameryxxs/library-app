import React from 'react';

const UploadFeature = ({ setUploadFile }) => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadFile(file);
      console.log('Uploaded file:', file);
    }
  };

  return (
    <div>
      <label className="block text-lg">Upload a file:</label>
      <input type="file" onChange={handleFileUpload} className="mt-2 p-2 border rounded" />
    </div>
  );
};

export default UploadFeature;
