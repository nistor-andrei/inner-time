import Image from "next/image";

const ProfileImage = ({
  avatarUrl,
  altText,
}: {
  avatarUrl?: string;
  altText: string;
}) => {
  return (
    <Image
      src={avatarUrl || "/profile.png"}
      alt={altText}
      width={40}
      height={40}
      className="w-10 h-10 rounded-full object-cover border"
    />
  );
};

export default ProfileImage;
