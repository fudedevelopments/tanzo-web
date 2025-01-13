import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { client } from '../../utils/client';

const HomeLayout: React.FC = () => {
  const [newTitle, setNewTitle] = useState('');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch titles
  const { data: titles, isError, isLoading } = useQuery({
    queryKey: ['HomePageProductTitles'],
    queryFn: async () => {
      const response = await client.models.HomePageProducts.list();
      return response.data || [];
    },
  });

  // Mutation for adding a new title
  const addMutation = useMutation({
    mutationFn: async (newTitle: string) => {
      const response = await client.models.HomePageProducts.create({ title: newTitle });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['HomePageProductTitles'],
      });
      setNewTitle(''); // Reset the input field
    },
  });

  // Mutation for deleting a title
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await client.models.HomePageProducts.delete({id: id});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['HomePageProductTitles'],
      });
    },
  });

  const handleAddTitle = () => {
    if (newTitle.trim()) {
      addMutation.mutate(newTitle);
    }
  };

  const handleDeleteTitle = (id: string) => {
    if (window.confirm('Are you sure you want to delete this title?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleTitleClick = (titleId: string, title: string) => {
    navigate(`/add-products-under-title/${titleId}/${title}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">Home Page Products Title</h1>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter product title"
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddTitle}
            disabled={addMutation.isPending}
            className={`px-4 py-2 rounded-md transition ${addMutation.isPending
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 text-white hover:bg-green-600'
              }`}
          >
            {addMutation.isPending ? 'Adding...' : 'Add'}
          </button>
        </div>

        {isLoading ? (
          <p className="text-gray-500 text-center">Loading titles...</p>
        ) : isError ? (
          <p className="text-red-500 text-center">Error fetching titles. Please try again.</p>
        ) : titles!.length > 0 ? (
          <ul className="space-y-2">
            {titles?.map((title) => (
              <li
                key={title.id}
                className="bg-gray-50 p-4 rounded-md shadow-sm border border-gray-200 flex justify-between items-center"
              >
                <span
                  onClick={() => handleTitleClick(title.id, title.title)}
                  className="cursor-pointer hover:text-blue-600 transition"
                >
                  {title.title}
                </span>
                <button
                  onClick={() => handleDeleteTitle(title.id)}
                  disabled={deleteMutation.isPending && deleteMutation.variables === title.id}
                  className={`px-2 py-1 text-sm rounded-md transition ${deleteMutation.isPending && deleteMutation.variables === title.id
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-red-500 text-white hover:bg-red-600'
                    }`}
                >
                  {deleteMutation.isPending && deleteMutation.variables === title.id
                    ? 'Deleting...'
                    : 'Delete'}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">No product titles added yet.</p>
        )}
      </div>
    </div>
  );
};

export default HomeLayout;
