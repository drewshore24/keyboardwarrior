const ProfileImage = ({ user }) => {
  return (
    <header className="px-2 py-4 mt-16 flex flex-col justify-center items-center text-center">
      <img
        className="inline-flex object-cover border-4 border-[#C96868] rounded-full shadow-[5px_5px_0_0_rgba(0,0,0,1)] shadow-[#C96868]/100  h-48 w-48 "
        src={user?.imgUrl}
        alt="profile picture"
      />
    </header>
  );
};

export default ProfileImage;
