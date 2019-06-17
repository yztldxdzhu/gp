package com.thinker.serviceImpl;

import com.thinker.domain.Orderitem;
import com.thinker.domain.Score;
import com.thinker.mapper.OrderMapper;
import com.thinker.mapper.ScoreMapper;
import com.thinker.service.ScoreService;
import com.thinker.util.MsgGenerate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * Created by hao on 17/5/12.
 */
@Component
public class ScoreServiceImpl implements ScoreService {
    @Autowired
    private ScoreMapper scoreMapper;

    @Autowired
    private OrderMapper orderMapper;

    @Override
    public Map<String,Object> insertScore(Score score) {
        Orderitem orderitem = orderMapper.selectOrderitemByGoodsId(score.getGoodsId());
        if(orderitem != null && orderitem.getOrderitemStatus() == 4){
            scoreMapper.addScore(score);
            return MsgGenerate.getSuccessMap("评分成功！");
        }else{
            return MsgGenerate.getErrorMap("评分失败，请先确认收货谢谢！");
        }
    }

}
