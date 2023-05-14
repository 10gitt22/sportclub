import PageLayout from "@/layouts/PageLayout";
import { ProfilePageLayout } from "@/layouts/ProfilePageLayout";
import { Profile } from "@/modules/profile";


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