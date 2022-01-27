import { config } from "../config/Constants";
import { Request, response, Response } from "express";
import shortid from "shortid";
import { UrlModel } from "../database/model/URL";

export default class UrlController {
  public async shorten(req: Request, res: Response): Promise<void> {
    const { originUrl } = req.body;

    const url = await UrlModel.findOne({ originUrl });

    if (url) {
      res.json(url);
      return;
    }

    const hash = shortid.generate();
    const shortUrl = `${config.API_URL}/${hash}`;
    const newUrl = await UrlModel.create({ hash, shortUrl, originUrl });
    res.json(newUrl);
  }
  public async redirect(req: Request, res: Response): Promise<void> {
    const { hash } = req.params;

    const url = await UrlModel.findOne({ hash });

    if (url) {
      res.redirect(url.originUrl);
      return;
    }

    res.status(400).json({ error: "Url Not found" });
  }
}
