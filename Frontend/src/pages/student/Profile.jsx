import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import Course from './Course';
import { useLoadUserQuery, useUpdateUserMutation } from '@/feature/api/authApi';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

function Profile() {
  const [name, setName] = useState('');
  const [profileUri, setProfileUri] = useState('');

  const { data, isLoading, error } = useLoadUserQuery();
  const [updateUser, { data: updateUserData, isLoading: updateUserIsLoading, error: updateUserError ,isSuccess}] =
    useUpdateUserMutation();

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfileUri(file);
  };

  const UserUpdateHandler = async () => {
    if (!name && !profileUri) return;

    const formData = new FormData();
    if (name) formData.append('name', name);
    if (profileUri) formData.append('photoUri', profileUri);

    try {
      await updateUser(formData).unwrap();
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile. Please try again.');
    }
  };

  useEffect(()=>{
    if(isSuccess){
      toast.success(data.message || "Profile updated successfully")
    }
    if(updateUserError){
      toast.error(updateUserError.data.message || "Failed to update profile")
  }
},[
    updateUserData,
    updateUserIsLoading,
    updateUserError,

  ])

  const user = data?.user || {};

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-gray-600" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  if (error) {
    if (error.status === 401) {
      return (
        <div className="flex justify-center flex-col gap-10 items-center h-screen">
          <p className="text-red-500">Unauthorized: Please log in to access your profile.</p>
          <Link to="/login">
            <Button className="hover:bg-zinc-700">Log in</Button>
          </Link>
        </div>
      );
    }
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">
          An error occurred: {error.message || JSON.stringify(error)}
        </p>
        <p className="text-red-500">
          {error.data?.message || 'Please try again later.'}
        </p>
      </div>
    );
  }

  const enrolledCourses = user?.enrolledCourses || [];

  return (
    <div className="max-w-4xl mx-auto px-4 my-10">
      <h1 className="uppercase font-bold text-2xl text-center md:text-left">Profile</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        <Avatar className="w-24 h-24 md:h-32 md:w-32 mb-4">
          <AvatarImage
            src={user?.photoUrl || '/path/to/local/default-avatar.png'}
            className="bg-red-400 object-cover w-full h-full rounded-full"
            alt="profilePic"
          />
          <AvatarFallback>{user?.name?.charAt(0).toUpperCase() || '?'}</AvatarFallback>
        </Avatar>
        <div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Name: <span className="font-normal text-gray-700 dark:text-gray-300">{user?.name || 'Unknown'}</span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Email: <span className="font-normal text-gray-700 dark:text-gray-300">{user?.email || 'Unknown'}</span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Role: <span className="font-normal uppercase text-gray-700 dark:text-gray-300">{user?.role || 'Unknown'}</span>
            </h1>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Edit Profile</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label>Name</Label>
                <Input
                  type="text"
                  placeholder="Name"
                  value={name || user?.name || ''}
                  className="col-span-3"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label>Profile Photo</Label>
                <Input type="file" onChange={onChangeHandler} name='photoUrl' accept="image/*" className="col-span-3" />
              </div>
              {updateUserError && (
                <p className="text-red-500">
                  Update failed: {updateUserError.data?.message || 'Please try again later.'}
                </p>
              )}
              <DialogFooter>
                <Button onClick={UserUpdateHandler} disabled={updateUserIsLoading}>
                  {updateUserIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <h1 className="font-medium text-lg">Courses you're enrolled in:</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
          {enrolledCourses.length === 0 ? (
            <h2>You haven't enrolled in any courses yet.</h2>
          ) : (
            enrolledCourses.map((course, idx) => <Course key={idx} {...course} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
