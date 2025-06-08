import Profile from "./Profile.jsx";

export default function ProfileSection() {
  return (
    <div className="ProfileSection box flex flex-col text-white items-center justify-center w-[95%] p-12 rounded-md m-10 border border-slate-500 shadow-sm shadow-gray-500/50">
      {users.map((user) => (
        <Profile user={user} key={user.id} />
      ))}
    </div>
  );
}

const users = [
  {
    id: 1,
    image: "/images/userImage.png",
    name: "Sample Username",
    role: "Student",
    domain: "Competitive Programmer",
  },
  {
    id: 2,
    image: "/images/userImage.png",
    name: "Sample Username",
    role: "Professional",
    domain: "Developer",
  },
  {
    id: 3,
    image: "/images/userImage.png",
    name: "Sample Username",
    role: "Student",
    domain: "Web Developer",
  },
  {
    id: 4,
    image: "/images/userImage.png",
    name: "Sample Username",
    role: "Professional",
    domain: "Coder",
  },
  {
    id: 5,
    image: "/images/userImage.png",
    name: "Sample Username",
    role: "Student",
    domain: "Competitive Programmer",
  },
  {
    id: 6,
    image: "/images/userImage.png",
    name: "Sample Username",
    role: "Professional",
    domain: "Developer",
  },
  {
    id: 7,
    image: "/images/userImage.png",
    name: "Sample Username",
    role: "Student",
    domain: "Web Developer",
  },
  {
    id: 8,
    image: "/images/userImage.png",
    name: "Sample Username",
    role: "Professional",
    domain: "Coder",
  },
  {
    id: 9,
    image: "/images/userImage.png",
    name: "Sample Username",
    role: "Student",
    domain: "Competitive Programmer",
  },
];
