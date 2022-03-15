import React, { useEffect, useState } from 'react';
import ChangePassword from '../../components/ChangePassword';
import NewPagination from '../../components/NewPagination';
import ProfileInfo from '../../components/ProfileInfo';
import EditProfile from '../../components/EditProfile';
import UserOrders from '../../components/UserOrders';
import Loading from '../../components/Loading';
import { getOrdersForUser } from '../../services/orderServices';
import Alert from '../../components/Alert';
import Modal from '../../components/Modal';
import { useForm } from 'react-hook-form';
import { UploadImage } from '../../services/ProfileServices';

const Profile = (props) => {
  const userData = JSON.parse(localStorage.getItem('userData')) || null;

  const [updatePhotoModalIsOpen, setUpdatePhotoModalIsOpen] = useState(false);
  const [photo, setPhoto] = useState(userData.photo);
  const [newPhoto, setNewPhoto] = useState(userData.photo);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [ordersErrors, setOrdersErrors] = useState('');
  const [orders, setOrders] = useState([]);
  const [lastFetched, setLastFetched] = useState('');
  const [queryAfter, setQueryAfter] = useState('');
  const [pages, setPages] = useState();

  //state for specifying the type of operation the user want to do and the default is showing info
  const [type, setType] = useState('info');

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({ mode: 'all' });

  const PhotoModalState = () => {
    updatePhotoModalIsOpen ? setUpdatePhotoModalIsOpen(false) : setUpdatePhotoModalIsOpen(true);
  };

  const getUserOrders = async (email, queryAfter) => {
    setOrdersLoading(true);
    const { data, pages } = await getOrdersForUser(email, queryAfter, 10);
    setLastFetched(data.last);
    setOrders(data.items);
    setOrdersLoading(false);
    setPages(pages);
  };
  useEffect(() => {
    getUserOrders(userData.email, queryAfter);
  }, [queryAfter, userData.email]);

  const form = () => {
    const style = {
      column: 'flex flex-col gap-1 mb-2 flex-grow',
      columnTitle: 'text-mc font-bold self-center',
      error: 'text-red-600 mt-1 text-sm',
      formInput: 'w-full p-1 border border-mc rounded-md outline-mc hover:border-lp form-input resize-none',
      submitBtn: ` hover:bg-lp bg-mc text-white active:bg-mcm mt-3 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg
       outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 disabled:cursor-not-allowed disabled:bg-dsbld`,
    };

    const onSubmit = async (value) => {
      const data = {
        photo: value.photo,
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
        phone: userData.phone,
      };
      setPhotoLoading(true);
      const url = await UploadImage(data);
      setNewPhoto(url);
      setPhotoLoading(false);
      PhotoModalState();
    };

    return (
      <form className={style.column} onSubmit={handleSubmit(onSubmit)} id="category-form">
        <img src={photo} alt="Profile-img" width="200px" className="self-center" />
        <section className={style.column}>
          <label className={style.columnTitle}>Profile Photo</label>
          <input
            {...register('photo', { required: true })}
            name="photo"
            type="file"
            className={style.formInput}
            id="files"
            onChange={(e) => {
              const src = URL.createObjectURL(e.target.files[0]);
              setPhoto(src);
            }}
          />
        </section>
        <button className={style.submitBtn} type="submit" disabled={!isValid}>
          {photoLoading ? (
            <span className="w-4">
              <Loading />
            </span>
          ) : (
            'Save'
          )}
        </button>
      </form>
    );
  };

  return (
    <main className="max-w-7xl mr-auto ml-auto py-8 px-2 lg:py-16 lg:px-5 ">
      <div className=" w-full flex flex-col items-center lg:flex-row lg:items-start justify-between">
        <div className="w-1/2 md:w-1/5 flex items-center justify-center mb-8 lg:mb-0">
          <img src={newPhoto} alt={userData.first} width="250px" onClick={() => setUpdatePhotoModalIsOpen(true)} />
        </div>
        {updatePhotoModalIsOpen && (
          <Modal title={'Profile Photo'} body={form()} footer={false} modalState={PhotoModalState} />
        )}
        <div className="w-full md:w-4/5 flex flex-col items-center justify-center">
          <div className="w-full lg:w-2/3 flex items-center justify-between mb-8">
            <button
              className={`lg:text-lg font-semibold ${type === 'info' && 'text-lp border-b-2 border-mc'}`}
              onClick={() => setType('info')}
              data-testid="profile_info"
            >
              Profile Information
            </button>
            <button
              className={`lg:text-lg font-semibold ${type === 'edit' && 'text-lp border-b-2 border-mc'}`}
              onClick={() => setType('edit')}
              data-testid="edit_profile"
            >
              Edit Profile
            </button>
            <button
              className={`lg:text-lg font-semibold ${type === 'password' && 'text-lp border-b-2 border-mc'}`}
              onClick={() => setType('password')}
              data-testid="change_password"
            >
              Change Password
            </button>
          </div>
          {type === 'info' ? (
            <ProfileInfo data={userData} />
          ) : type === 'edit' ? (
            <EditProfile data={userData} />
          ) : type === 'password' ? (
            <ChangePassword />
          ) : null}
        </div>
      </div>

      <section className="flex flex-col items-center mt-16 gap-10 md:px-5">
        <header className="text-center">
          <h2 className="text-mc font-bold text-5xl mb-3">My Orders</h2>
          <p className="text-mcm text-sm text-center">Click On Order To View Details</p>
        </header>
        {ordersLoading ? (
          <div className="w-3/4 flex items-center justify-center">
            <Loading />
          </div>
        ) : ordersErrors ? (
          <Alert status={'fail'} message={ordersErrors} />
        ) : orders?.length > 0 ? (
          <UserOrders orders={orders} />
        ) : (
          <div className="font-semibold text-lg">You didn't make any orders yet</div>
        )}
        <div className="flex justify-center">
          <NewPagination lastFetched={lastFetched} setQueryAfter={setQueryAfter} pages={pages} />
        </div>
      </section>
    </main>
  );
};

export default Profile;
