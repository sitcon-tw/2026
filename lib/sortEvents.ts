/**
 * 活動排序工具函式
 * 統一使用 Asia/Taipei 時區處理活動時間
 */

export interface Event {
  id: string | number;
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  location?: string;
  description?: string;
  type?: string;
  link?: string;
  duration?: number;
}

export interface SortedEvents {
  upcoming: Event[];
  past: Event[];
}

/**
 * 取得目前 Asia/Taipei 時間
 */
function getTaipeiNow(): Date {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Taipei" }));
}

/**
 * 將活動的日期時間字串轉換為 Asia/Taipei 時區的 Date 物件
 */
function getEventDateTime(date: string, time: string): Date {
  // 建立完整的日期時間字串，明確指定台灣時區
  const dateTimeString = `${date}T${time}:00+08:00`;
  const eventDate = new Date(dateTimeString);
  
  // 如果解析失敗，嘗試其他格式
  if (isNaN(eventDate.getTime())) {
    // 嘗試不帶時區的格式，然後手動調整到台灣時間
    const fallbackDate = new Date(`${date} ${time}`);
    if (!isNaN(fallbackDate.getTime())) {
      return fallbackDate;
    }
    // 如果都失敗，返回當前時間作為備用
    return new Date();
  }
  
  return eventDate;
}

/**
 * 將活動分為未來活動和過去活動，並分別排序
 * @param events 活動列表
 * @param referenceTime 參考時間（預設為目前台灣時間）
 * @returns 分類且排序後的活動物件
 */
export function splitAndSortEvents(
  events: Event[], 
  referenceTime?: Date
): SortedEvents {
  const now = referenceTime || getTaipeiNow();
  
  const upcoming: Event[] = [];
  const past: Event[] = [];
  
  // 依據時間分類：ongoing 活動歸類為 upcoming
  events.forEach(event => {
    const eventDateTime = getEventDateTime(event.date, event.time);
    const duration = event.duration || 3;
    const eventEndTime = new Date(eventDateTime.getTime() + duration * 60 * 60 * 1000);
    
    // 只要活動還沒結束（包含正在進行），就歸類為未來活動
    if (eventEndTime >= now) {
      upcoming.push(event);
    } else {
      past.push(event);
    }
  });
  
  // 未來活動：依開始時間由近到遠排序（升序）
  upcoming.sort((a, b) => {
    const timeA = getEventDateTime(a.date, a.time);
    const timeB = getEventDateTime(b.date, b.time);
    return timeA.getTime() - timeB.getTime();
  });
  
  // 過去活動：依結束時間由近到遠排序（最近結束的在上，降序）
  past.sort((a, b) => {
    const timeA = getEventDateTime(a.date, a.time);
    const timeB = getEventDateTime(b.date, b.time);
    return timeB.getTime() - timeA.getTime();
  });
  
  return { upcoming, past };
}

/**
 * 取得最近的 N 筆未來活動
 * @param events 活動列表
 * @param limit 限制筆數（預設為 5）
 * @param referenceTime 參考時間（預設為目前台灣時間）
 * @returns 最近的未來活動列表
 */
export function nearestUpcoming(
  events: Event[], 
  limit: number = 5, 
  referenceTime?: Date
): Event[] {
  const { upcoming } = splitAndSortEvents(events, referenceTime);
  return upcoming.slice(0, limit);
}

/**
 * 取得完整排序的活動列表（未來活動 + 過去活動）
 * @param events 活動列表
 * @param upcomingLimit 未來活動顯示數量限制（預設不限制）
 * @param pastLimit 過去活動顯示數量限制（預設為 0）
 * @param referenceTime 參考時間（預設為目前台灣時間）
 * @returns 排序後的活動列表
 */
export function getSortedEvents(
  events: Event[], 
  upcomingLimit?: number, 
  pastLimit: number = 0,
  referenceTime?: Date
): Event[] {
  const { upcoming, past } = splitAndSortEvents(events, referenceTime);
  
  const limitedUpcoming = upcomingLimit ? upcoming.slice(0, upcomingLimit) : upcoming;
  const limitedPast = pastLimit > 0 ? past.slice(0, pastLimit) : [];
  
  return [...limitedUpcoming, ...limitedPast];
}

/**
 * 檢查活動是否正在進行中
 * @param event 活動物件
 * @param referenceTime 參考時間（預設為目前台灣時間）
 * @returns 是否正在進行中
 */
export function isEventOngoing(event: Event, referenceTime?: Date): boolean {
  const now = referenceTime || getTaipeiNow();
  const eventStart = getEventDateTime(event.date, event.time);
  const duration = event.duration || 3; // 預設 3 小時
  const eventEnd = new Date(eventStart.getTime() + duration * 60 * 60 * 1000);
  
  return now >= eventStart && now <= eventEnd;
}

/**
 * 取得活動狀態
 * @param event 活動物件
 * @param referenceTime 參考時間（預設為目前台灣時間）
 * @returns 活動狀態：'upcoming' | 'ongoing' | 'completed'
 */
export function getEventStatus(
  event: Event, 
  referenceTime?: Date
): 'upcoming' | 'ongoing' | 'completed' {
  const now = referenceTime || getTaipeiNow();
  const eventStart = getEventDateTime(event.date, event.time);
  const duration = event.duration || 3; // 預設 3 小時
  const eventEnd = new Date(eventStart.getTime() + duration * 60 * 60 * 1000);
  
  if (now < eventStart) {
    return 'upcoming';
  } else if (now >= eventStart && now <= eventEnd) {
    return 'ongoing';
  } else {
    return 'completed';
  }
}