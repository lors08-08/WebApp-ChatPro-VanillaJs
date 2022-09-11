//language=hbs
export default `
  <div class="flex h100">
      <div class="{{ styles.sidebar }}">
          {{ sidebar }}
      </div>
      <div class="{{ styles.main-wrapper }} flexColumn w100">
          {{ main }}
      </div>
  </div>
`;
