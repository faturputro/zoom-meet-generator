import CreateMeetings from '@/utils/dto/CreateMeeting';
import { Response, Request } from 'express';
import http from '../utils/axios';

async function generateLinks(req: Request, res: Response) {
  try {
    const { topic, duration }: CreateMeetings = req.body;

    const data = {
      topic,
      type: 2,
      duration,
    };

    
    const result =  await http({
      method: 'POST',
      url: `/users/me/meetings`,
      data,
    });

    res.status(200).json(result.data);
    
  } catch (e) {
    console.error(e);
    res.status(400).json({
      message: (e as any).response.data.message,
    });
  }
}

async function deleteWebinar(req: Request, res: Response) {
  try {
    const { topic, duration }: CreateMeetings = req.body;

    const data = {
      topic,
      type: 5,
      duration,
    };

    
    const result =  await http({
      method: 'DELETE',
      url: `/meetings/${req.params.meetingId}`,
    });

    res.status(200).json(result.data);
  } catch (e) {
    console.error(e);
    res.status(400).json({
      message: (e as any).response.data.message,
    });
  }
}

export default {
  generateLinks,
  deleteWebinar
};
