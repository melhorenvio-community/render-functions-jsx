<script>
import { h, ref, onMounted } from "vue";

export default {
  setup() {
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
      h("section", { class: "divContainer" }, [
        h("h1", { class: "title" }, ["Products"]),
        h(
          "form",
          {
            class: "divContainer",
            onsubmit: (Event) => Event.preventDefault(),
          },
          [
            h(
              "select",
              {
                onInput: (Event) => {
                  selectValue.value = Event.target.value;
                },
                onClick: async () => {
                  productsList(selectValue.value);
                },
                style: {
                  display: "block",
                  width: "100%",
                  borderRadius: "0.25rem",
                  border: "solid 1px #0350a0",
                  backgroundColor: "#ffff",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                  paddingTop: "16px",
                  paddingBottom: "8px",
                  fontSize: ".875rem",
                  lineHeight: "1rem",
                  fontFamily: "Lato, sans-serif",
                  fontWeight: "400",
                },
              },
              [
                categories.value?.map((showItem) =>
                  h(
                    "option",
                    {
                      style: {
                        fontFamily: "Lato, sans-serif",
                        color: "#0350a0",
                        fontWeight: "400",
                      },
                    },
                    [showItem]
                  )
                ),
              ]
            ),
          ]
        ),
        h("div", { class: "flexClass" }, [
          h("section", { class: "showProducts" }, [
            selectValue.value
              ? productsAll.value?.map((productId) =>
                  h(
                    "div",
                    {
                      class: "shadow",
                      style: {
                        padding: "10px",
                      },
                    },
                    [
                      h("h2", { class: "text" }, [productId.title]),
                      h("img", {
                        src: productId.image,

                        style: {
                          maxWidth: "100%",
                          height: "156px",
                          margin: "0 auto",
                        },
                      }),
                    ]
                  )
                )
              : h("img", {
                  src: "src/assets/searchProducts.svg",
                  style: {
                    margin: "0 auto",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    marginLeft: "400px",
                    padding: "10px",
                  },
                }),
          ]),
        ]),
      ]);
  },
};
</script>

<style scoped>
.divContainer {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 5vh 20vh 10px 20vh;
}
.flexClass {
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  padding: 5px;
}

.showProducts {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 2fr 2fr;
  width: 100%;
  grid-gap: 10px;
}
</style>
