let state = {};
let resultColumns = [{
  key: "moves",
  label: "Рухи",
  values: [],
}, {
  key: "places",
  label: "Місце у просторі",
  values: [],
}, {
  key: "moving",
  label: "Просування",
  values: [],
}, {
  key: "positions",
  label: "Позиція до глядача",
  values: [],
}, {
  key: "counts",
  label: "Рахунки",
  values: [],
}, {
  key: "emotions",
  label: "Емоції",
  values: [],
}, {
  key: "organs",
  label: "Частини тіла",
  values: [],
}];

const dataHookSelector = (hookName) => {
  let selector;
  if (!hookName || hookName === "*") {
    // select all data-hooks
    selector = "[data-hook]";
  } else {
    // select specific data-hook
    selector = `[data-hook~="${hookName}"]`;
  }
  return selector;
};

const configureExtends = () => {
  $.extend({
    hook: (hookName) => {
      const selector = dataHookSelector(hookName);
      return $(selector);
    }
  });

  $.fn.extend({
    findHook: function (hookName) {
      const selector = dataHookSelector(hookName);
      return this.find(selector);
    },
    closestHook: function (hookName) {
      const selector = dataHookSelector(hookName);
      return this.closest(selector);
    },
    nextHook: function (hookName) {
      const selector = dataHookSelector(hookName);
      return this.next(selector);
    }
  });
};

const getCardItems = (hookName) => {
  const result = [];
  const element = $.hook(hookName);
  if (element) {
    element.children('li').each((index, item) => result.push($(item).text()));
  }
  return result;
};

const initState = () => {
  state = {
    ...state,
    allMoves: getCardItems("all-moves"),
    places: getCardItems("place-items"),
    moving: getCardItems("moving-items"),
    positions: getCardItems("positions"),
    counts: getCardItems("counts"),
    emotions: getCardItems("emotions"),
    organs: getCardItems("organs"),
  };
};

const randomize = (count, items) => {
  let arr = [];
  while (arr.length < count) {
    const value = Math.floor(Math.random() * items.length);
    if (arr.indexOf(items[value]) === -1) {
      arr.push(items[value]);
    }
  }
  return arr;
};

const handleShowAllMoves = () => {
  $.hook("all-moves").addClass("show-all-moves");
  $.hook("show-all-moves").addClass("hide");
};

const handleRandom = () => {
  const {allMoves, places, moving, positions, counts, emotions, organs} = state;
  const random = {
    "moves": randomize(4, allMoves),
    "places": $.hook("place-items-checkbox").prop('checked') ? randomize(1, places) : null,
    "moving": $.hook("moving-items-checkbox").prop('checked') ? randomize(2, moving) : null,
    "positions": $.hook("positions-checkbox").prop('checked') ? randomize(1, positions) : null,
    "counts": $.hook("counts-checkbox").prop('checked') ? randomize(1, counts) : null,
    "emotions": $.hook("emotions-checkbox").prop('checked') ? randomize(1, emotions) : null,
    "organs": $.hook("organs-checkbox").prop('checked') ? randomize(1, organs) : null,
  };

  const result = resultColumns
    .map((item) => {
      const randomValues = random[item.key];
      if (randomValues) {
        return {
          ...item,
          values: randomValues
        }
      }
    })
    .filter(Boolean);
  drawResult(result);
};

const drawResult = (result) => {
  let resultHtml = "";
  result.forEach((item) => {
    resultHtml += `
      <div class="result-card">
        <h3>
          ${item.label}
        </h3>
        <ul>
          ${item.values.map((value) => `<li>${value}</li>`).join("")}
        </ul>
      </div>
    `;
  });
  $.hook("result").html(resultHtml);
};

$(function() {
  configureExtends();
  initState();
  $.hook("show-all-moves").on("click", handleShowAllMoves)
  $.hook("random-button").on("click", handleRandom);
});
