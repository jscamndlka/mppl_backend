import Report from "../models/ReportModel.js";
import { Op } from "sequelize";
import path from "path";
export const getReports = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const status = req.query.status || "";
    const offset = limit * page;

    const whereCondition = {
      title: {
        [Op.like]: `%${search}%`,
      },
      status: {
        [Op.like]: `%${status}%`,
      },
    };

    let result, totalRows, totalPage;

    console.log(req.userId);

    if (req.role === "division") {
      const divisionWhere = {
        division: req.division,
        ...whereCondition,
      };

      totalRows = await Report.count({ where: divisionWhere });
      result = await Report.findAll({
        where: divisionWhere,
        offset,
        limit,
        order: [["id", "DESC"]],
      });
    } else if (req.role === "thl") {
      const thlWhere = {
        userId: req.userId,
        ...whereCondition,
      };

      totalRows = await Report.count({ where: thlWhere });
      result = await Report.findAll({
        where: thlWhere,
        offset,
        limit,
        order: [["id", "DESC"]],
      });
    } else {
      totalRows = await Report.count({ where: whereCondition });
      result = await Report.findAll({
        where: whereCondition,
        offset,
        limit,
        order: [["id", "DESC"]],
      });
    }

    totalPage = Math.ceil(totalRows / limit);

    res.status(200).json({
      result,
      totalRows,
      totalPage,
      limit,
      page,
    });
  } catch (error) {
    console.error("Error in getReports:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getReportById = async (req, res) => {
  try {
    const report = await Report.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(report);
  } catch (error) {}
};

export const createReport = async (req, res) => {
  try {
    if (req.files === null || req.files === undefined) {
      return res.status(400).json({ msg: "Belum ada file yang diupload" });
    }

    const { title, description, startTime, endTime, duration } = req.body;
    const image = req.files.image;

    // Get file details
    const fileSize = image.data.length;
    const ext = path.extname(image.name);
    const fileName = image.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase())) {
      return res.status(422).json({ msg: "Invalid Images" });
    }

    if (fileSize > 5000000) {
      return res.status(422).json({ msg: "Image must be less than 5 MB" });
    }

    image.mv(`./public/images/${fileName}`, async (err) => {
      if (err) {
        return res.status(500).json({ msg: err.message });
      }

      try {
        await Report.create({
          title,
          description,
          status: "NOT COMPLETED",
          startTime,
          endTime,
          duration,
          division: req.division,
          image: fileName,
          url: url,
          userId: req.userId,
        });

        return res.status(201).json({ msg: "Report created successfully" });
      } catch (error) {
        console.error("Error while creating report:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
      }
    });
  } catch (error) {
    console.error("Error in createReport function:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const updateStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const report = await Report.update(
      {
        status: status,
      },
      {
        where: {
          uuid: req.params.id,
        },
      }
    );
    res.status(200).json(report);
  } catch (error) {}
};
