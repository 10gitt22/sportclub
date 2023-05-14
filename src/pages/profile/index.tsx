import PageLayout from "@/layouts/PageLayout";
import { ProfilePageLayout, type ProfilePageProps } from "@/layouts/ProfilePageLayout";

const Profile = ({ ...props }) => { 
  const { user, profile } = props as ProfilePageProps  

  return (
    <div className="h-screen p-10">
      <h1 className="text-h2">{user.name}</h1>
    </div>
  )
}

const ProfilePage = () => {
  return (
    <PageLayout>
      <ProfilePageLayout>
        <Profile />
      </ProfilePageLayout>
    </PageLayout>
  )
}

export default ProfilePage