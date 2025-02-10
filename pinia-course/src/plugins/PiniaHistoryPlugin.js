import { ref, reactive } from "vue";

export function PiniaHistoryPlugin({ store, options }) {
  if (!options.historyEnabled) return;

  const history = reactive([]);
  const future = reactive([]);
  const doingHistory = ref(false);

  history.push(JSON.stringify(store.$state));

  store.$subscribe((_, state) => {
    if (!doingHistory.value) {
      history.push(JSON.stringify(state));
      // Clear the 'future' array without breaking reactivity
      future.splice(0, future.length);
      // Avoid using 'future = []' here to ensure proper reactivity
    }
  });

  return {
    history,
    future,
    undo: () => {
      if (history.length === 1) return;

      doingHistory.value = true;
      future.push(history.pop());
      store.$state = JSON.parse(history.at(-1));
      doingHistory.value = false;
    },
    redo: () => {
      const latestState = future.pop();
      if (!latestState) return;

      doingHistory.value = true;
      history.push(latestState);
      store.$state = JSON.parse(latestState);
      doingHistory.value = false;
    },
  };
}