<script>
import { h, ref } from "vue";

export default {
  setup(props) {
    let inputValue = ref(null);
    return () =>
      h("div", {}, [
        h("h3", { class: "title" }, "v-model example"),

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
              placeholder: "V-model test...",
              onInput: (Event) => {
                inputValue.value = Event.target.value;
              },
            }),

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
