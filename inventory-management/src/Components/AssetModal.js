import React, { useState } from 'react';
const AssetModal = ({ isOpen, closeModal, onSave, formData, setFormData,categ }) => {
  const [pdfFile, setPdfFile] = useState(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  console.log(categ);
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    onSave();
  };
  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    setPdfFile(file);
  };

  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 overflow-y-auto z-50'>
          <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <div
              className='fixed inset-0 transition-opacity'
              aria-hidden='true'
            >
              <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
            </div>

            <span
              className='hidden sm:inline-block sm:align-middle sm:h-screen'
              aria-hidden='true'
            >
              &#8203;
            </span>

            <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'>
              <div>
                <h2 className='text-2xl font-semibold mb-4'>Asset Details</h2>
                <form onSubmit={handleSubmit}>
                  {/* Your form input fields go here */}
                  <div className='mb-4'>
                    <label htmlFor='assetname' className='block text-sm font-medium text-gray-700'>
                      Asset Name
                    </label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      value={formData.name}
                      onChange={handleInputChange}
                      className='mt-1 p-2 w-full border rounded-md'
                      placeholder='Enter asset name'
                      required
                    />
                  </div>
                  {categ === 'consumable' ? (
                    <div className='mb-4'>
                      <label htmlFor='quantity' className='block text-sm font-medium text-gray-700'>
                        Quantity
                      </label>
                      <input
                        type='text'
                        id='quantity'
                        name='quantity'
                        value={formData.quantity}
                        onChange={handleInputChange}
                        className='mt-1 p-2 w-full border rounded-md'
                        placeholder='Enter quantity'
                        required
                      />
                    </div>
                  ) : (
                    <div className='mb-4'>
                      <label htmlFor='assetTag' className='block text-sm font-medium text-gray-700'>
                        Asset Tag
                      </label>
                      <input
                        type='text'
                        id='tag'
                        name='tag'
                        value={formData.tag}
                        onChange={handleInputChange}
                        className='mt-1 p-2 w-full border rounded-md'
                        placeholder='Enter asset tag'
                        required
                      />
                    </div>
                  )}
                  <div className='mb-4'>
                    <label htmlFor='details' className='block text-sm font-medium text-gray-700'>
                    Details
                    </label>
                    <input
                      type='text'
                      id='details'
                      name='details'
                      value={formData.details}
                      onChange={handleInputChange}
                      className='mt-1 p-2 w-full border rounded-md'
                      placeholder='Enter details'
                      required
                    />
                  </div>
                  
                  <div className='mb-4'>
                    <label htmlFor='type' className='block text-sm font-medium text-gray-700'>
                    Type
                    </label>
                    <input
                      type='text'
                      id='type'
                      name='type'
                      value={formData.type}
                      onChange={handleInputChange}
                      className='mt-1 p-2 w-full border rounded-md'
                      placeholder='Enter type'
                      required
                    />
                  </div>

                  <div className='mb-4'>
                    <label htmlFor='branch' className='block text-sm font-medium text-gray-700'>
                    Branch
                    </label>
                    <input
                      type='text'
                      id='branch'
                      name='branch'
                      value={formData.branch}
                      onChange={handleInputChange}
                      className='mt-1 p-2 w-full border rounded-md'
                      placeholder='Enter branch'
                      required
                    />
                  </div>
                  <div className='mb-4'>
                    <label htmlFor='pdfFile' className='block text-sm font-medium text-gray-700'>
                      Upload File
                    </label>
                    <input
                      type='file'
                      id='pdfFile'
                      name='pdfFile'
                      onChange={handlePdfUpload}
                      className='mt-1 p-2 w-full border rounded-md'
                      accept='.pdf'
                      required
                    />
                  </div>
                  
                  <div className='flex items-center justify-end'>
                    <button
                      type='submit'
                      className='px-2 py-2 transition rounded-lg bg-black text-yellow-400 hover:bg-white hover:text-gray-800 border-2 border-gray-200 focus:outline-none'
                    >
                      Save Asset
                    </button>
                    <button
                      type='button'
                      onClick={closeModal}
                      className='ml-2 inline-flex justify-center px-4 py-2 bg-gray-300 border border-transparent rounded-md font-semibold text-gray-700 hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-500 active:bg-gray-500'
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default AssetModal;
