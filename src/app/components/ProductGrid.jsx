export default function ProductGrid() {
  return (
    <section className=" bg-white space-y-[1.5px] mt-[2px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1.5px]">
        <div className="relative">
          <img src="col1.jpg" alt="" className="w-full h-auto" />
          <div className="absolute bottom-10 left-6 text-white text-lg font-semibold">
            SHIRT
          </div>
        </div>

        <div className="relative">
          <img src="col2.jpg" alt="" className="w-full h-auto" />
          <div className="absolute bottom-10 left-6 text-white text-lg font-semibold">
            PANJABI
          </div>
        </div>

        <div className="relative">
          <img src="col3.jpg" alt="" className="w-full h-auto" />
          <div className="absolute bottom-10 left-6 text-white text-lg font-semibold">
            POLO & T-SHIRT
          </div>
        </div>
        <div className="relative">
          <img src="col4.jpg" alt="" className="w-full h-auto" />
          <div className="absolute bottom-10 left-6 text-white text-lg font-semibold">
            SALWAR KAMEEZ
          </div>
        </div>
        <div className="relative">
          <img src="col5.jpg" alt="" className="w-full h-auto" />
          <div className="absolute bottom-10 left-6 text-white text-lg font-semibold">
            KURTIS
          </div>
        </div>
        <div className="relative">
          <img src="col6.jpg" alt="" className="w-full h-auto" />
          <div className="absolute bottom-10 left-6 text-white text-lg font-semibold">
            KNIT TOPS
          </div>
        </div>
      </div>
      <div className="w-full px-0">
        <div className="w-full">
          <div
            className="bg-cover bg-center h-[300px] flex items-center justify-center"
            style={{
              backgroundImage:
                "url('https://www.trendzbd.com/images/media/2022/07/LkSzC30310.jpg')",
            }}
          >
            <div className="text-center text-white">
              <h2 className="text-[40px] font-medium">THE MOST TRENDY</h2>
              <h3 className="text-xl mt-2">THE MOST WANTED</h3>
              <a
                href="#"
                className="inline-block mt-12 px-6 py-2 bg-white hover:bg-slate-200 text-black"
              >
                Discover More
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <div className="relative">
          <img src="men.jpg" alt="" className="w-full h-auto" />
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-lg">
            <a
              href="#"
              className="inline-block px-6 py-2 bg-white hover:bg-slate-200 text-black"
            >
              MEN
            </a>
          </div>
        </div>
        <div className="relative">
          <img src="women.jpg" alt="" className="w-full h-auto" />
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-lg">
            <a
              href="#"
              className="inline-block px-6 py-2 bg-white hover:bg-slate-200 text-black"
            >
              WOMEN
            </a>
          </div>
        </div>
        <div className="relative sm:col-span-2 md:col-span-1">
          <img
            src="accessories.jpg"
            alt=""
            className="w-full h-auto max-h-screen"
          />
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-lg">
            <a
              href="#"
              className="inline-block px-6 py-2 bg-white hover:bg-slate-200 text-black"
            >
              Accessories
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
