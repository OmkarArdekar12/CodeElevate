import Profile from "./Profile.jsx";

export default function ProfileSection() {
  return (
    <div className="box flex flex-col text-white items-center justify-center w-[95%] p-12 rounded-md m-10 border border-slate-500 shadow-sm shadow-gray-500/50">
      {users.map((user) => (
        <Profile user={user} />
      ))}
    </div>
  );
}

const users = [
  {
    image: "/images/userImage.png",
    name: "Sample Username",
    role: "Student",
    domain: "Competitive Programmer",
  },
  {
    image: "/images/userImage.png",
    name: "Sample Username",
    role: "Professional",
    domain: "Developer",
  },
  {
    image: "/images/userImage.png",
    name: "Sample Username",
    role: "Student",
    domain: "Web Developer",
  },
  {
    image: "/images/userImage.png",
    name: "Sample Username",
    role: "Professional",
    domain: "Coder",
  },
  {
    image: "/images/userImage.png",
    name: "Sample Username",
    role: "Student",
    domain: "Competitive Programmer",
  },
  {
    image: "/images/userImage.png",
    name: "Sample Username",
    role: "Professional",
    domain: "Developer",
  },
  {
    image: "/images/userImage.png",
    name: "Sample Username",
    role: "Student",
    domain: "Web Developer",
  },
  {
    image: "/images/userImage.png",
    name: "Sample Username",
    role: "Professional",
    domain: "Coder",
  },
  {
    image: "/images/userImage.png",
    name: "Sample Username",
    role: "Student",
    domain: "Competitive Programmer",
  },
];
