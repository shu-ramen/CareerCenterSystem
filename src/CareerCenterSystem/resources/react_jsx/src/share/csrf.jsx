export function addHeader(request) {
    let csrfToken = document.getElementsByName("csrfmiddlewaretoken")[0].value;
    return request
      .set('X-CSRFToken', csrfToken)
      .set('X-Requested-With', 'XMLHttpRequest');
}

export function getCsrfTokenTag() {
  let csrfToken = document.getElementsByName("csrfmiddlewaretoken")[0].value;
  return (
      <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken}></input>
  )
}