/***
 * opens a new tab
 * @param url string url to open
 * @param active bool is active tab
 */
export function openUrl(url, active)
{
    chrome.tabs.create({
        url:url, 
        active: active,
    });
}