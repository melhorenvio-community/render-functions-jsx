<script>
import { h, ref } from "vue";

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
      console.log(shows.value);
    };

    //const ss = slots.default ? slots.default() : [];
    const ss = (show) => (slots.sc ? slots.sc(show) : []);

    return () =>
      h("div", [
        h("h3", { class: "title" }, "Virtual Lessor"),
        ss({ shows: shows.value }),
        h(
          "form",
          {
            class: "forms",
            onsubmit: (Event) => Event.preventDefault(),
          },
          [
            h("input", {
              style: {
                border: "0.5px solid #ce62b4",
                borderRadius: "4px",
                padding: "12px",
                width: "300px",
                boxShadow: "0 0 1em #ce62b4",
              },
              placeholder: "Type the show name...",
              onInput: (Event) => {
                inputValue.value = Event.target.value;
              },
            }),
            h(
              "button",
              {
                class: "primary-button",
                onClick: async () => {
                  textSearch(inputValue.value);
                },
              },
              ["Search"]
            ),
            h("div", { class: "shows" }, [
              error.value
                ? h("div", error.value)
                : shows.value?.map((showItem) =>
                    h("div", { class: "show" }, [
                      h("h3", { class: "text" }, showItem.show.name),
                      h("img", {
                        src: showItem.show.image?.medium,
                        style: {
                          boxShadow: "0 0 0.2em #ce62b4",
                        },
                      }),
                    ])
                  ),
            ]),
          ]
        ),
      ]);
  },
};
</script>
<style>
.show {
  margin: 10px;
  min-width: 210px;
}
.shows {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
}

.forms {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0px;
  justify-content: center;
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
  font-weight: 400;
  font-size: large;
  margin-top: 30px;
  font-size: 20px;
}

.primary-button {
  border: 1px solid grey;
  border-radius: 4px;
  padding: 12px 20px;
  margin-left: 24px;
  color: #fff;
  background-color: #ce62b4;
  border-color: #ce62b4;
  cursor: pointer;
}
</style>
