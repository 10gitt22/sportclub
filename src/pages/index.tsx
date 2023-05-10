import PageLayout from "@/layouts/PageLayout";
import { Button } from "@/ui/Button";
import { type NextPage } from "next";

const Home: NextPage = () => {
  return (
    <PageLayout>
      <section id="intro" className="px-5 lg:px-10 pt-[80px]">
        <h1 className="text-h1 text-center mb-10">sportclub</h1>
        <div className="h-[700px] bg-[url(https://images.unsplash.com/photo-1593079831268-3381b0db4a77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2400&q=80)] bg-no-repeat bg-cover bg-center"></div>
      </section>
      <section id="about" className="px-5 lg:px-10 pt-[100px] md:pt-[120px]">
        <span className="text-descriptor text-gray-700 border-l-4 border-l-primaryDarken pl-10 py-2 font-light">про нас</span>
        <p className=" my-10 md:my-15 text-h3">
          <span className="font-bold border-b-8 border-primaryDarken">sportclub</span> - ідеальне місце для тих, хто прагне покращити свою фізичну форму, зберегти здоров&apos;я і насолоджуватися активним способом життя.
        </p>     

        <div className="flex flex-wrap justify-between py-20 gap-20 ">
          <div className="flex gap-5 items-start w-[350px]">
            <div className="text-[10rem] text-primaryDarken leading-none">2</div>
            <div className="text-p">
              <span className="font-bold ">зали</span>
              <p className="text-zinc-400 text-xs font-light mt-1">для жінок та чоловіків з широким спектром тренажерів і обладнання останнього покоління</p>
            </div>
          </div>
          <div className="flex gap-5 items-start w-[350px]">
            <div className="text-[10rem] text-primaryDarken leading-none">3</div>
            <div className="text-p">
              <span className="font-bold">тренери</span>
              <p className="text-zinc-400 text-xs font-light mt-1">
              які завжди готові надати вам професійну підтримку та план тренувань
              </p>
            </div>
          </div>
          <div className="flex gap-5 items-start w-[350px]">
            <div className="text-[10rem] text-primaryDarken leading-none">7</div>
            <div className="text-p">
              <span className="font-bold">відзнак</span>
              <p className="text-zinc-400 text-xs font-light mt-1">
                нашого клубу на різних конкурсах. нас визнають не лише клієнти
              </p>
            </div>
          </div>
        </div>
        <ul className="mt-10 text-h3 list-disc list-inside flex flex-col gap-2">
          <h3 className="mb-5">послуги:</h3>
          <li>індивідуальні тренування</li>
          <li>персональний тренерський супровід</li>
          <li>фітнес-консультування</li>
          <li>розробка програми харчування</li>
        </ul>

        <div className="flex flex-col md:flex-row gap-3 my-20">
          <div className="h-[700px]  md:w-[50%] bg-[url(https://images.unsplash.com/photo-1574680376345-b2995af0324f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80)] bg-no-repeat bg-cover bg-center"></div>
          <div className="h-[700px] md:w-[50%] bg-[url(https://images.unsplash.com/photo-1574680088814-c9e8a10d8a4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80)] backdrop-brightness-50bg-no-repeat filter-g bg-cover bg-center"></div>
        </div>
        <h2 className="text-h2">здоров&apos;я - твій успіх, фітнес - твій шлях!</h2>
      </section>
      <section id="trainers" className="px-5 lg:px-10 pt-[100px] md:pt-[120px]">
        <span className="text-descriptor text-gray-700 border-l-4 border-l-primaryDarken pl-10 py-2 font-light">тренери</span>
        <div className="flex gap-10 justify-center flex-wrap mt-20">
          <div className="max-w-[400px] w-full">
            <div className="bg-[url(https://drama.kropyva.ch/images/b/b4/%D0%9F%D0%B5%D1%82%D1%80%D0%BE_%D0%BC%D0%BE%D1%82%D0%B8%D0%B2%D1%83%D1%94.jpg)]
            w-full h-[500px] bg-cover bg-center
            "></div>
            <div className="mt-5">
              <h3 className="text-h3">Петро Моставчук</h3>
              <p className="text-p text-gray-400 font-light">тренер, мотиватор</p>
              <p className="mt-2">дні занять: пн, вт, ср, чт, пт, сб, нд</p>
            </div>
          </div>
          <div className="max-w-[400px] w-full">
            <div className="bg-[url(https://image-cdn.essentiallysports.com/wp-content/uploads/Mike-OHearn.jpg)]
            w-full h-[500px] bg-cover bg-center
            "></div>
            <div className="mt-5">
              <h3 className="text-h3 w-[80%]">Майкл О&apos;Херн</h3>
              <p className="text-p text-gray-400 font-light">тренер, бодібілдер</p>
              <p className="mt-2">дні занять: вт, чт, сб, нд</p>
            </div>
          </div>
          <div className="max-w-[400px] w-full">
            <div className="bg-[url(https://talksport.com/wp-content/uploads/sites/5/2021/07/the-rock-raises-the-peoples-eyebrow.jpeg?strip=all&quality=100&w=960&h=540&crop=1)]
            w-full h-[500px] bg-cover bg-center
            "></div>
            <div className="mt-5">
              <h3 className="text-h3">Дуейн Джонсон</h3>
              <p className="text-p text-gray-400 font-light">тренер, скала</p>
              <p className="mt-2">дні занять: пн, ср, пт, нд</p>
            </div>
          </div>
        </div>
      </section>
      <section id="abonements" className="px-5 lg:px-10 pt-[100px] pb-[150px] md:pt-[120px]">
        <span className="text-descriptor text-gray-700 border-l-4 border-l-primaryDarken pl-10 py-2 font-light">абонементи</span>
        <div className="flex flex-wrap gap-10 justify-center mt-20">
          <div className="max-w-[400px] h-[300px] md:h-[500px] flex flex-col bg-borderDark text-white rounded-[10px] justify-between w-full shadow-lg p-10">
            <h3 className="text-h3">Стандарт</h3>
            <div className="">
              <ul className="flex flex-col list-image-[url(../../public/icons/check.svg)] list-inside">
                <li>кількість занять: 1</li>
                <li>тренер: немає</li>
                <li>тривалість дії абонементу: 3 дні</li>
              </ul>
              <div className="flex justify-between items-center mt-10">
                <div className=" text-[2rem] font-bold">300 грн</div>
                <Button>придбати</Button>
              </div>
            </div>
          </div>
          <div className="max-w-[400px] h-[300px] md:h-[500px] flex flex-col bg-borderDark text-white rounded-[10px] justify-between w-full shadow-lg p-10">
            <h3 className="text-h3">Стандарт з тренером</h3>
            <div className="">
              <ul className="flex flex-col list-image-[url(../../public/icons/check.svg)] list-inside">
                <li>кількість занять: 1</li>
                <li>тренер: є</li>
                <li>тривалість дії абонементу: 3 дні</li>
              </ul>
              <div className="flex justify-between items-center mt-10">
                <div className=" text-[2rem] font-bold">500 грн</div>
                <Button>придбати</Button>
              </div>
            </div>
          </div>
          <div className="max-w-[400px] h-[300px] md:h-[500px] flex flex-col bg-borderDark text-white rounded-[10px] justify-between w-full shadow-lg p-10">
            <h3 className="text-h3">Місяць стандарт</h3>
            <div className="">
              <ul className="flex flex-col list-image-[url(../../public/icons/check.svg)] list-inside">
                <li>кількість занять: 12</li>
                <li>тренер: немає</li>
                <li>тривалість дії абонементу: 30 днів</li>
              </ul>
              <div className="flex justify-between items-center mt-10">
                <div className=" text-[2rem] font-bold">3000 грн</div>
                <Button>придбати</Button>
              </div>
            </div>
          </div>
          <div className="max-w-[400px] h-[300px] md:h-[500px] flex flex-col bg-borderDark text-white rounded-[10px] justify-between w-full shadow-lg p-10">
            <h3 className="text-h3">Місяць про</h3>
            <div className="">
              <ul className="flex flex-col list-image-[url(../../public/icons/check.svg)] list-inside">
                <li>кількість занять: 12</li>
                <li>тренер: немає</li>
                <li>тривалість дії абонементу: 30 днів</li>
              </ul>
              <div className="flex justify-between items-center mt-10">
                <div className=" text-[2rem] font-bold">5000 грн</div>
                <Button>придбати</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Home;