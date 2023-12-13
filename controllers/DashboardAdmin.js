import Report from "../models/ReportModel.js";
import User from "../models/UserModel.js";

export const countTHL = async (req, res) => {
  try {
    const result = await User.count({
      where: {
        role: "thl",
      },
    });
    console.log(result);
    res.status(200).json({ message: "Berhasil", result: result });
  } catch (error) {
    console.log(error);
  }
};

export const reportNotCompleted = async (req, res) => {
  try {
    let result;
    if (req.role === "admin") {
      result = await Report.count({
        where: {
          status: "NOT COMPLETED",
        },
      });
    } else if (req.role === "division") {
      result = await Report.count({
        where: {
          division: req.division,
        },
      });
    } else if (req.role === "thl") {
      result = await Report.count({
        where: {
          userId: req.userId,
        },
      });
    }

    console.log(result);
    res.status(200).json({ message: "Berhasil", result: result });
  } catch (error) {
    console.log(error);
  }
};

export const reportReject = async (req, res) => {
  try {
    let result;
    if (req.role === "admin") {
      result = await Report.count({
        where: {
          status: "REJECT",
        },
      });
    } else if (req.role === "division") {
      result = await Report.count({
        where: {
          division: req.division,
          status: "REJECT",
        },
      });
    } else if (req.role === "thl") {
      result = await Report.count({
        where: {
          userId: req.userId,
          status: "REJECT",
        },
      });
    }

    console.log(result);
    res.status(200).json({ message: "Berhasil", result: result });
  } catch (error) {
    console.log(error);
  }
};

export const reportAccept = async (req, res) => {
  try {
    let result;
    if (req.role === "admin") {
      result = await Report.count({
        where: {
          status: "ACCEPT",
        },
      });
    } else if (req.role === "division") {
      result = await Report.count({
        where: {
          division: req.division,
          status: "ACCEPT",
        },
      });
    } else if (req.role === "thl") {
      result = await Report.count({
        where: {
          userId: req.userId,
          status: "ACCEPT",
        },
      });
    }

    console.log(result);
    res.status(200).json({ message: "Berhasil", result: result });
  } catch (error) {
    console.log(error);
  }
};
