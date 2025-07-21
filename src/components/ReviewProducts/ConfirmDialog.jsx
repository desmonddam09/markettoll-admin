import React from 'react';

const ConfirmDialog = ({ type, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs w-full">
        <div className="text-lg font-semibold mb-4">
          {type === 'accept' ? 'Accept this product?' : 'Reject this product?'}
        </div>
        <div className="flex gap-3 justify-between px-5">
          <button
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={onCancel}
          >Cancel</button>
          <button
            className={`px-4 py-2 rounded text-white ${type === 'accepted' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
            onClick={onConfirm}
          >Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog; 