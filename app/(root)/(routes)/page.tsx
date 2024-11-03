import RevealAnimation from "@/components/motion/RevealAnimation";
import Banner from "@/components/ui/banner";
import Services from "@/components/ui/services";
import UnderConstruction from "@/components/under-construction/under-construction";

import React from "react";

const Homepage = () => {
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;

  return (
    <section className="">
      {environment === "development" && <UnderConstruction />}

      {environment === "production" && (
        <div>
          <Banner />
          <Services />
          <div className="mt-20">
            <RevealAnimation />
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
            sit quam repellat quod excepturi provident hic laudantium ratione
            consequuntur non amet nemo, quibusdam reprehenderit suscipit
            eligendi. Eos dolor dignissimos provident.
          </p>
          <br />
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim totam
            eaque ipsum repellat et similique vel odit mollitia ratione itaque
            quaerat doloribus molestias voluptates reprehenderit, vitae aut
            accusantium corrupti delectus.
          </p>
          <br />
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci nam
          doloremque suscipit ad qui fugiat debitis illo veritatis tempore eum
          at ipsam culpa rem dolorum quas quis exercitationem, placeat,
          accusamus est magnam, voluptatibus autem a. Voluptatem vero recusandae
          error earum totam, harum ipsa praesentium architecto nobis odio
          tempora commodi consequuntur, similique pariatur autem aliquid enim
          asperiores quis corporis laborum deserunt dolor velit? Consectetur
          fuga ullam voluptatem corporis voluptatum esse animi atque deserunt
          suscipit doloribus voluptas facilis in ipsam veniam mollitia amet, eum
          perferendis reiciendis. Maxime ad quis molestias nihil quae deserunt
          nisi, beatae obcaecati excepturi praesentium iure consequuntur libero
          quos nostrum aliquid quas magni itaque voluptate dolorum fugiat ipsam
          iusto omnis! Blanditiis, sit nihil sint nesciunt ea accusantium
          voluptatum cumque nulla, temporibus voluptatem esse magni quaerat? Non
          suscipit tempore consequatur accusantium dolore magnam, ullam, quos
          vero voluptates porro reprehenderit doloremque enim hic perferendis
          dolores voluptatum quas ipsa impedit velit! Debitis cupiditate totam
          eaque nesciunt repellat tempore, quod maxime exercitationem
          consequuntur aperiam magnam at ullam voluptate eos assumenda
          dignissimos praesentium minima nisi cumque! Veritatis ratione incidunt
          quidem sequi consectetur ullam laboriosam dicta at, nemo omnis dolore
          doloribus animi nobis doloremque eveniet ipsa. Quaerat accusamus
          numquam unde iste sed exercitationem, beatae molestiae. Dignissimos
          unde odit officiis, fugiat nam quasi similique quam dolores minima?
          Atque laborum distinctio, maxime rem, iusto quaerat soluta temporibus
          dolorem dicta obcaecati accusamus impedit qui beatae optio, a eum
          blanditiis veniam? Obcaecati maiores quasi porro deleniti quae non,
          consectetur molestias provident ullam quisquam, expedita beatae
          laudantium laborum voluptatem! Facilis.
        </div>
      )}
    </section>
  );
};

export default Homepage;
