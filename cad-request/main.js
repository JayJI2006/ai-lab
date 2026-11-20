const form = document.querySelector("#request-form");
const formFields = form.querySelector("fieldset");
const service = document.querySelector("#service");
const format = document.querySelector("#format");
const deadline = document.querySelector("#deadline");
const quantity = document.querySelector("#quantity");
const description = document.querySelector("#description");
const fields = [service, format, deadline, quantity, description];
const quantityError = document.querySelector("#quantity-error");
const emptySummary = document.querySelector("#summary-empty");
const summaryOutput = document.querySelector("#summary-output");
const copyButton = document.querySelector("#copy-summary");
const copyStatus = document.querySelector("#copy-status");

function updateSummary() {
  const invalidQuantity = quantity.validity.badInput || (quantity.value !== "" && !quantity.validity.valid);
  quantityError.hidden = !invalidQuantity;
  quantity.setAttribute("aria-invalid", String(invalidQuantity));

  const details = description.value.trim();
  const complete = fields.every((field) => field.validity.valid) && details !== "";
  summaryOutput.value = complete ? [
    "CAD 繪圖需求摘要",
    `服務類型：${service.value}`,
    `交付格式：${format.value}`,
    `截止日期：${deadline.value}`,
    `圖紙數量：${quantity.valueAsNumber} 張`,
    "",
    "需求描述：",
    details,
  ].join("\n") : "";

  emptySummary.hidden = complete;
  summaryOutput.hidden = !complete;
  copyButton.disabled = !complete;
  copyStatus.textContent = "";
}

function copyUsingSelection() {
  summaryOutput.focus();
  summaryOutput.select();
  summaryOutput.setSelectionRange(0, summaryOutput.value.length);
  try {
    if (document.execCommand("copy")) {
      copyButton.focus();
      return true;
    }
  } catch {
    // Keep the summary selected for manual copying.
  }
  return false;
}

copyButton.addEventListener("click", async () => {
  const summary = summaryOutput.value;
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(summary);
      if (summaryOutput.value === summary) {
        copyStatus.textContent = "已複製摘要。";
      }
      return;
    } catch {
      // Try copying the selected text if clipboard access is unavailable.
    }
  }

  if (summaryOutput.value === summary) {
    copyStatus.textContent = copyUsingSelection()
      ? "已複製摘要。"
      : "已選取摘要，請使用裝置的複製指令。";
  }
});

form.addEventListener("submit", (event) => event.preventDefault());
form.addEventListener("input", updateSummary);
window.addEventListener("pageshow", updateSummary);
formFields.disabled = false;
updateSummary();
