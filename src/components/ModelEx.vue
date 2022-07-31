<script lang="jsx">
import { h, ref } from "vue";
import { MEButton, METextField } from "@melhorenvio/ds-core";

export default {
  setup(props) {
    let inputValue = ref(null);
    return () =>
      h("div", { class: "divContainer" }, [
        h("h3", { class: "title" }, "v-model example"),

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
              />,
              {
                placeholder: "V-model test...",
                onInput: (Event) => {
                  inputValue.value = Event.target.value;
                },
              }
            ),

            h("div", { class: "forms" }, [
              inputValue.value
                ? h(
                    "div",
                    {
                      class: "text",
                    },
                    [`v-model value: ${inputValue.value}`]
                  )
                : h("span", ""),
            ]),
          ]
        ),
      ]);
  },
};
</script>
<style scoped>
.forms {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0px;
  justify-content: center;
}
.divContainer {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 5vh 20vh 10px 20vh;
}
</style>
