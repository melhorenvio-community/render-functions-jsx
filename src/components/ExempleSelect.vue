<script>
import { h, ref, onMounted } from "vue";

export default {
  setup(props) {
    let categories = ref(null);
    let productsAll = ref(null);
    let error = ref(null);
    let selectValue = ref(null);

    const searchCategories = async () => {
      categories.value = [];

      const getCategories = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      categories.value = await getCategories.json();
      return categories.value;
    };

    const productsList = async (search) => {
      productsAll.value = [];

      const list = await fetch(
        `https://fakestoreapi.com/products/category/${search}`
      ).catch((e) => {
        error.value = "error" + e;
        console.log("error", error.value);
        return;
      });
      productsAll.value = await list.json().catch((e) => (error.value = e));
      console.log(productsAll.value);
    };

    onMounted(() => {
      searchCategories();
      productsList(selectValue.value);
    });

    return () =>
      h("div", [
        h("h3", { class: "title" }, "Available products"),
        h("div", { class: "forms" }, [
          h(
            "select",
            {
              style: {
                border: "0.5px solid #ce62b4",
                borderRadius: "4px",
                padding: "12px",
                width: "300px",
                boxShadow: "0 0 1em #ce62b4",
              },
              onInput: (Event) => {
                selectValue.value = Event.target.value;
              },
              onClick: async () => {
                productsList(selectValue.value);
              },
            },
            [
              categories.value?.map((showItem) => h("option", showItem)),
             
            ]
          ),
          h("div", { class: "shows" }, [
            selectValue.value
              ? productsAll.value?.map((productId) =>
                  h("div", { class: "show" }, [
                    h("h3", { class: "text" }, productId.title),
                   //h("p", { class: "text" }, [productId.description]),
                    h("img", {
                      src: productId.image,
                      class: "img"
                    }),
                  ])
                )
              : ["search products by category..."],
          ]),
        ]),
      ]);
  },
};
</script>

<style scoped>
img {
  max-width: 100%;
  height: 156px;
  margin: 0 auto;
   
  
}
.shows {
  display: grid;
  grid-template-columns: repeat(2, 0.4fr);
  max-width: 100%;
  overflow-x: hidden;
  margin: 0 auto;
  grid-gap: 10px;
}
.show {
  display: flex;
  flex-direction :row-reverse;
  margin-top: 60px;
}

.title {
  text-align: center;
  font-family: sans-serif;
  font-weight: 400;
  font-size: large;
  margin-top: 30px;
  font-size: 35px;
  color: #ce62b4;
}

.text {
  text-align: center;
  font-family: sans-serif;
  font-weight: 100;
  font-size: medium;
  
}
</style>




