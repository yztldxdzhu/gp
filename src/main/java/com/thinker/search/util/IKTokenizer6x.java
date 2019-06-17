package com.thinker.search.util;

import org.apache.lucene.analysis.Tokenizer;
import org.apache.lucene.analysis.tokenattributes.CharTermAttribute;
import org.apache.lucene.analysis.tokenattributes.OffsetAttribute;
import org.apache.lucene.analysis.tokenattributes.TypeAttribute;
import org.apache.lucene.util.AttributeFactory;
import org.wltea.analyzer.core.IKSegmenter;
import org.wltea.analyzer.core.Lexeme;

import java.io.IOException;

/**
 * 支持6.x版本的IKTokenizer
 * 采用中文分词库为IKAnalyzer,重写lucene的两个抽象类中的两个方法
 * Created by Asus on 2017/1/11.
 */
public class IKTokenizer6x extends Tokenizer {
    private IKSegmenter ikSegmenter;
    private final CharTermAttribute termAttribute = this.addAttribute(CharTermAttribute.class);
    private final OffsetAttribute offsetAttribute = this.addAttribute(OffsetAttribute.class);
    private final TypeAttribute typeAttribute = this.addAttribute(TypeAttribute.class);
    private int endPosition;

    public IKTokenizer6x() {
        this.ikSegmenter = new IKSegmenter(this.input, true);
    }

    public IKTokenizer6x(boolean useSmart) {
        this.ikSegmenter = new IKSegmenter(this.input, useSmart);
    }

    public IKTokenizer6x(AttributeFactory factory) {
        super(factory);
        this.ikSegmenter = new IKSegmenter(this.input, true);
    }

    @Override
    public boolean incrementToken() throws IOException {
        this.clearAttributes();
        Lexeme nextLexeme = this.ikSegmenter.next();
        if (nextLexeme != null) {
            this.termAttribute.append(nextLexeme.getLexemeText());
            this.termAttribute.setLength(nextLexeme.getLength());
            this.offsetAttribute.setOffset(nextLexeme.getBeginPosition(), nextLexeme.getEndPosition());
            this.typeAttribute.setType(nextLexeme.getLexemeTypeString());
            return true;
        }
        return false;
    }

    @Override
    public void reset() throws IOException {
        super.reset();
        this.ikSegmenter.reset(this.input);
    }

    @Override
    public void end() throws IOException {
        super.end();
        int finalOffset = this.correctOffset(this.endPosition);
        this.offsetAttribute.setOffset(finalOffset, finalOffset);
    }
}
