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
      console.log(shows.value);
    };

    //const ss = slots.default ? slots.default() : [];
    const ss = (show) => (slots.sc ? slots.sc(show) : []);

    return () =>
    
      h("div", {class: "divMain"}, [
        h("h3", { class: "title" }, "Virtual Lessor"),
        ss({ shows: shows.value }),
        h(
          "form",
          {
            class: "forms",
            onsubmit: (Event) => Event.preventDefault(),
          },
          [
            h(
            <METextField
              label="Type the show name..."
              name="name"
              rules="required"
              autofocus
              standalone
              class="inputStyle"
            />,
            {
              onInput: (Event) => {
                inputValue.value = Event.target.value;
                console.log(inputValue.value)
              },
            }),
            
            h(
               <MEButton
                 alt
                 compact
                 label="search"
               />,
              {
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

.divMain{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.inputStyle {
  width: 50% !important;
}
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
