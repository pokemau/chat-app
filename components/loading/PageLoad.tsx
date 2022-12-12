import Image from "next/image";

const PageLoad = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <Image
        className="loader rounded-full"
        src="/assets/yui_loading.jpg"
        width={200}
        height={200}
        alt="yui loading image"
        priority
      />
    </div>
  );
};

export default PageLoad;
