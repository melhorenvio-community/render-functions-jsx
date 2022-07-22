<script lang="jsx">
import { h, ref } from "vue";
import { MEButton, METextField } from "@melhorenvio/ds-core";

export default {
  setup(_, { slots }) {
    let inputValue = ref(null);
    let shows = ref(null);
    let error = ref(null);
    const textSearch = async (search) => {
      shows.value = [];
      const advancedSearch = await fetch(
        `https://api.tvmaze.com/search/shows?q=${search}`
      ).catch((e) => {
        error.value = "error" + e;
        console.log("error", error.value);
        return;
      });
      shows.value = await advancedSearch.json().catch((e) => (error.value = e));
    };
    //const ss = slots.default ? slots.default() : [];
    const ss = (show) => (slots.sc ? slots.sc(show) : []);

    return () =>
      h("section", [
        h("h1", { class: "title" }, ["Movie Search"]),
        ss({
          shows: shows.value,
        }),
        h(
          "form",
          { class: "container", onsubmit: (Event) => Event.preventDefault() },
          [
            h(
              <METextField
                label="Type the show name..."
                name="name"
                rules="required"
                autofocus
                standalone
              />,
              {
                onInput: (Event) => {
                  inputValue.value = Event.target.value;
                  console.log(inputValue.value);
                },
              }
            ),
            h(<MEButton alt compact label="search"></MEButton>, {
              style: {
                marginLeft: "1vh",
                marginTop: "0.5vh",
              },
              onClick: async () => {
                textSearch(inputValue.value);
                r;
              },
            }),
          ]
        ),
        h("div", { class: "shows" }, [
          shows.value
            ? shows.value?.map((showItem) =>
                h("div", { class: "show" }, [
                  h("h3", { class: "text" }, showItem.show.name),
                  h("img", {
                    src: showItem.show.image?.medium,
                    style: {
                      boxShadow: "0 0 0.2em #0350a0",
                      margin: "0 auto",
                    },
                  }),
                ])
              )
            : h("div", [
                h("img", {
                  src: "src/assets/searchMovie.svg",
                  style: {
                    margin: "0 auto",
                    maxWidth: "100%",
                    maxHeight: "70%",
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
.container {
  display: flex;
  margin: 0 auto;
  padding: 50px;
}
.show {
  margin: 6px;
  min-width: 210px;
}
.shows {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  padding: 20px;
}
</style>
