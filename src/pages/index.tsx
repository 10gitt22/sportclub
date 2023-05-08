import PageLayout from "@/layouts/PageLayout";
import { type NextPage } from "next";

const Home: NextPage = () => {
  return (
    <PageLayout>
      <section id="intro" className="h-[700px] bg-[url(https://images.unsplash.com/photo-1558611848-73f7eb4001a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80)] flex justify-center items-center">
        <div className="w-full h-full bg-gray-950/70 p-10 flex flex-col justify-center items-center">
          <h1 className="text-h1">sportclub</h1>
          <p className="text-2xl">сучасний спортзал у Львові</p>
        </div>
      </section>
      <section id="about" className="px-10 py-20 min-h-[700px]">
        <h2 className="text-h1">про <span className="border-b-8 border-teal-500">sportclub</span></h2>
        <div className="flex gap-20 justify-between">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt recusandae suscipit temporibus illum modi debitis natus ex porro exercitationem hic! Aut deleniti vero ipsum dolorum harum minus sed magnam laboriosam delectus. Ratione odio tempore fuga pariatur dolorsibus quos perferendis amet harum nostrum asperiores error deleniti voluptate eos illum nihil aspernatur animi, ipsum sapiente explicabo beatae laudantium iure. Quis aliquid ipsam, unde nisi obcaecati nihil iure expedita quo animi blanditiis, laborum laudantium neque quibusdam beatae perspiciatis fugiat officiis eius dolor explicabo aliquam, eum dolorem. Unde dolor enim id, obcaecati rem ipsum fuga inventore tenetur? Laudantium quidem dolorem maxime harum, ab autem!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt recusandae suscipit temporibus illum modi debitis natus ex porro exercitationem hic! Aut deleniti vero ipsum dolorum harum minus sed magnam laboriosam delectus. Ratione odio tempore fuga pariatur dolorsibus quos perferendis amet harum nostrum asperiores error deleniti voluptate eos illum nihil aspernatur animi, ipsum sapiente explicabo beatae laudantium iure. Quis aliquid ipsam, unde nisi obcaecati nihil iure expedita quo animi blanditiis, laborum laudantium neque quibusdam beatae perspiciatis fugiat officiis eius dolor explicabo aliquam, eum dolorem. Unde dolor enim id, obcaecati rem ipsum fuga inventore tenetur? Laudantium quidem dolorem maxime harum, ab autem!</p>
        </div>
      </section>
      <section id="trainers" className="p-10 min-h-[700px] bg-borderDark">
        <h2 className="text-h1 text-center">тренери</h2>
        <div className="flex justify-between gap-10 mt-5">
          <div className="h-[500px] w-[400px] p-5 bg-black rounded-[20px] flex flex-col justify-end">
            <div className="flex flex-col gap-5">
              <p className="text-[30px]">Петро Петрович</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem nemo a facilis, explicabo illum tenetur totam temporibus perferendis repellendus iste?</p>
            </div>
          </div>
          <div className="h-[500px] w-[400px] p-5 bg-black rounded-[20px] flex flex-col justify-end">
            <div className="flex flex-col gap-5">
              <p className="text-[30px]">Віктор Вікторович</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem nemo a facilis, explicabo illum tenetur totam temporibus perferendis repellendus iste?</p>
            </div>
          </div>
          <div className="h-[500px] w-[400px] p-5 bg-black rounded-[20px] flex flex-col justify-end">
            <div className="flex flex-col gap-5">
              <p className="text-[30px]">Іван Іванович</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem nemo a facilis, explicabo illum tenetur totam temporibus perferendis repellendus iste?</p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Home;