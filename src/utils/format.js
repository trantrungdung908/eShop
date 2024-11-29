import { TIME_DISPLAYS } from "@/constants/format-date";
import moment from "moment";

export const transNumberToPercent = (number) => {
  if (!number) return 0;
  return number * 100;
};

export const formatDate = (date, formatType = TIME_DISPLAYS.DATE) => {
  if (!!!date) return;
  return moment(date).format(formatType);
};

export const removeAccents = (str) => {
  // remove accents
  var from =
      "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
    to =
      "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(RegExp(from[i], "gi"), to[i]);
  }

  str = str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\-]/g, "-")
    .replace(/-+/g, "-");

  return str;
};
