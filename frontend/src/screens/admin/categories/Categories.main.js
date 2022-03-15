import React, { useState, useEffect } from 'react';
import Loading from '../../../components/Loading';
import Modal from '../../../components/Modal';
import DeleteBody from '../../../components/DeleteBody';
import NewCategoryForm from './components/NewCategoryForm';
import { getAllCategories, deleteCategory, AddCategory } from './services/admin.categories.service';

// TODO : Need to restructure data form service to set pagination probably 15-2-2022
const Categories = () => {
  const [data, setData] = useState({ loading: true });
  const [categoryData, setCategoryData] = useState('');
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [newCategoryModalIsOpen, setNewCategoryModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const style = {
    row: 'flex items-center justify-between border-b-2 border-nc group hover:bg-mc hover:text-white py-2 cursor-pointer',
    title: 'text-lg',
    icon: 'h-7 text-mc group-hover:text-white',
  };

  const fetchData = async () => {
    setIsLoading(true);
    const data = await getAllCategories();
    setData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteModalState = () => {
    deleteModalIsOpen ? setDeleteModalIsOpen(false) : setDeleteModalIsOpen(true);
  };

  const categoryModalState = () => {
    newCategoryModalIsOpen ? setNewCategoryModalIsOpen(false) : setNewCategoryModalIsOpen(true);
  };

  const deleteHandler = async (e) => {
    loading();
    const id = e.target.id;
    const { error } = await deleteCategory(id);
    messageHandler(error);
    deleteModalState();
    fetchData();
  };

  const NewCategoryHandler = async (data) => {
    loading();
    const { error } = await AddCategory(data);
    messageHandler(error);
    categoryModalState();
    fetchData();
  };

  const messageHandler = (message) => {
    if (message) {
      setError(message);
      console.log(message);
    }
    setIsLoading(false);
  };

  const loading = () => {
    isLoading ? setIsLoading(false) : setIsLoading(true);
  };

  const row = (data) => {
    return data.map((category) => {
      return (
        <div className={style.row} key={category.title}>
          <span className={style.title}>{category.title}</span>
          <button>
            <svg
              onClick={() => {
                setCategoryData(category);
                setDeleteModalIsOpen(true);
              }}
              xmlns="http://www.w3.org/2000/svg"
              className={style.icon}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      );
    });
  };

  if (isLoading) return <Loading />;
  return (
    <div className="pt-16 flex flex-col">
      <div className="flex justify-between border-b-2 border-mc mb-4 pb-2">
        <span className="text-3xl font-bold text-mc ">Categories</span>
        <button
          className="py-2 px-3 md:px-4 rounded-sm bg-mc text-white text-center  text-base 
              hover:bg-lp"
          onClick={() => {
            setNewCategoryModalIsOpen(true);
          }}
        >
          Add New Category
        </button>
      </div>
      {row(data)}
      {deleteModalIsOpen && (
        <Modal
          modalState={deleteModalState}
          title={`${categoryData.title} category`}
          body={DeleteBody(`${categoryData.title} category`)}
          btn={{
            title: 'Confirm',
            attr: {
              type: 'button',
              onClick: deleteHandler,
              id: categoryData.slug,
            },
          }}
        />
      )}
      {newCategoryModalIsOpen && (
        <Modal
          modalState={categoryModalState}
          title={'Add New Category'}
          body={<NewCategoryForm submit={NewCategoryHandler} />}
          key="NewCategory"
          footer={false}
        />
      )}
    </div>
  );
};

export default Categories;
